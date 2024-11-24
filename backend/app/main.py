# backend/app/main.py

import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import re
import openai
import random
import unicodedata
import string
from jinja2 import Environment, BaseLoader
from bs4 import BeautifulSoup
import bleach
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# =====================================
# Configuración del Logging
# =====================================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

# =====================================
# Inicializar FastAPI
# =====================================
app = FastAPI()

# =====================================
# Configuración de CORS
# =====================================
origins = [
    "http://localhost:3000",  # URL de tu front-end
    # Añade otras URLs si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# Configuración de OpenAI y Directorios
# =====================================
load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    logging.error("No se encontró la variable de entorno OPENAI_API_KEY")
    raise ValueError("No se encontró la variable de entorno OPENAI_API_KEY")

MODEL_NAME = 'gpt-4'

OUTPUT_DIRECTORY = os.getenv("OUTPUT_DIRECTORY", '../frontend/src/app/posts')
ALLOW_SEARCH_ENGINES = True

os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)

# =====================================
# Contexto y Palabras Clave para SEO
# =====================================
WEBSITE_CONTEXT = """
Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.
"""

SEO_KEYWORDS = [
    'artículos',
    'noticias',
    'información',
    'temas de interés',
    'actualidad',
]

# =====================================
# Plantilla del Prompt para OpenAI
# =====================================
USER_PROMPT_TEMPLATE = """
Debes crear el contenido para un artículo que contenga:

- Un **título único** que no se repita con los títulos existentes.
- Uno o más **párrafos descriptivos** relacionados con el siguiente contexto del sitio web:
  {WEBSITE_CONTEXT}

- Incluir **tablas**, **imágenes**, **listas** u otros elementos HTML que consideres apropiados para enriquecer el contenido.
- **No incluyas clases CSS en ninguna etiqueta**; el sistema asignará las clases adecuadas automáticamente.
- Asegúrate de que el contenido esté relacionado con las siguientes **palabras clave** para optimizar el SEO:
  {keywords_str}

**Notas importantes**:

- Proporciona el contenido en formato **HTML válido**, incluyendo las etiquetas correspondientes.
- El título debe estar dentro de una etiqueta `<h1>`.
- No incluyas el `<head>` ni el `<body>`, solo el contenido dentro del `<body>`.
- No incluyas explicaciones adicionales ni delimitadores de código.
- **Todo el contenido debe estar dentro de etiquetas HTML**; evita texto plano fuera de ellas.
- Asegúrate de que el HTML sea válido y bien formado.

A continuación se muestran los últimos {num_posts} títulos y contenidos de posts existentes para evitar repeticiones:

{last_posts}
"""

# =====================================
# Plantilla TSX para las Páginas de Posts
# =====================================
POST_TEMPLATE = r"""
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "{{ title }}";
  const meta_description = "{{ meta_description }}";
  const meta_keywords = "{{ meta_keywords }}";
  const meta_robots = "{{ meta_robots }}";
  const body_content = `{{ body_content }}`;

  const caracteristicas = body_content.match(/<li>.*?<\/li>/g)?.map(li => li.replace(/<\/?li>/g, '')) || [];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keywords} />
        <meta name="robots" content={meta_robots} />
      </Head>
      <Header
        introduccion={meta_description}
        caracteristicas={caracteristicas}
        globalFotos={[/* Añade URLs de imágenes si es necesario */]}
        marcaPadre={title}
      />
      <PostDetails content={body_content} />
    </>
  );
};

export default PostPage;
"""

# =====================================
# Función para Generar Slug a partir del Título
# =====================================
def generate_slug(title):
    title_normalized = unicodedata.normalize('NFKD', title)
    title_encoded = title_normalized.encode('ascii', 'ignore').decode('ascii')
    title_lower = title_encoded.lower()
    allowed_chars = string.ascii_lowercase + string.digits + ' '
    title_clean = ''.join(c for c in title_lower if c in allowed_chars)
    words = title_clean.strip().split()
    stopwords = {'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'en', 'y', 'a', 'por', 'para', 'con', 'sin', 'sobre', 'entre', 'del', 'al', 'tu', 'su', 'es', 'que'}
    meaningful_words = [word for word in words if word not in stopwords]
    filename_words = meaningful_words[:3]
    filename_base = '_'.join(filename_words)
    filename_base = filename_base[:50]
    if not filename_base:
        filename_base = 'pagina'
    return filename_base

# =====================================
# Funciones Auxiliares para Leer Slugs y Contenidos
# =====================================

def read_post_content(slug):
    page_path = os.path.join(OUTPUT_DIRECTORY, slug, 'page.tsx')
    if not os.path.exists(page_path):
        return ""
    
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer el contenido HTML
    body_content_match = re.search(r'const body_content = `([\s\S]*?)`;', content)
    if body_content_match:
        return body_content_match.group(1)
    return ""

def read_post_title(slug):
    page_path = os.path.join(OUTPUT_DIRECTORY, slug, 'page.tsx')
    if not os.path.exists(page_path):
        return ""
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'<title>(.*?)<\/title>', content)
    return match.group(1) if match else ""

# =====================================
# Inicializar Jinja2 para Renderizar Plantillas
# =====================================
env = Environment(loader=BaseLoader())
template = env.from_string(POST_TEMPLATE)

# =====================================
# Modelos de Datos con Pydantic
# =====================================
class CreatePostRequest(BaseModel):
    last_posts: list  # List of dicts with 'title' and 'content'

class PostProps(BaseModel):
    title: str
    meta_description: str
    meta_keywords: str
    meta_robots: str
    body_content: str

# =====================================
# Endpoint para Generar Posts Manualmente
# =====================================
@app.post("/generate-post/")
def generate_post(request: CreatePostRequest):
    logging.info("Solicitud recibida para generar un nuevo post.")

    # Leer los últimos posts proporcionados
    last_posts_info = ""
    for post in request.last_posts:
        title = post.get('title', '')
        content = post.get('content', '')
        last_posts_info += f"Título: {title}\nContenido: {content}\n\n"

    # Seleccionar palabras clave
    selected_keywords = random.sample(SEO_KEYWORDS, min(len(SEO_KEYWORDS), 5))
    keywords_str = ', '.join(selected_keywords)
    logging.info(f"Palabras clave seleccionadas: {keywords_str}")

    # Robots
    robots_content = 'index, follow' if ALLOW_SEARCH_ENGINES else 'noindex, nofollow'
    logging.info(f"Meta robots configurado a: {robots_content}")

    # Preparar prompt
    user_prompt = USER_PROMPT_TEMPLATE.format(
        WEBSITE_CONTEXT=WEBSITE_CONTEXT.strip(),
        keywords_str=keywords_str,
        last_posts=last_posts_info.strip(),
        num_posts=len(request.last_posts)
    )
    logging.info("Prompt preparado para OpenAI.")

    # Mensajes para OpenAI
    messages = [
        {
            "role": "system",
            "content": "Eres un asistente que genera contenido para una página web optimizado para SEO.",
        },
        {
            "role": "user",
            "content": user_prompt,
        },
    ]

    # Configurar la clave de API
    openai.api_key = API_KEY

    # Solicitar a OpenAI
    try:
        logging.info("Enviando solicitud a OpenAI para generar contenido.")
        response = openai.ChatCompletion.create(
            model=MODEL_NAME,
            messages=messages,
            max_tokens=1500,
            temperature=0.7,
            n=1,
            stop=None,
        )
        logging.info("Respuesta recibida de OpenAI.")
    except Exception as e:
        logging.error(f"Error al comunicarse con OpenAI: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    generated_content = response['choices'][0]['message']['content'].strip()
    logging.info("Contenido generado por OpenAI.")

    # Procesar HTML
    html_start = generated_content.find('<')
    html_end = generated_content.rfind('>') + 1
    html_content = generated_content[html_start:html_end] if html_start != -1 and html_end != -1 else ""
    soup = BeautifulSoup(html_content, 'html.parser')

    # Eliminar clases existentes
    for tag in soup.find_all():
        if 'class' in tag.attrs:
            del tag['class']

    # Asignar clases
    ELEMENT_CLASSES = {
        'h1': ['h1_1', 'h1_2', 'h1_3', 'h1_4', 'h1_5'],
        'p': ['p_1', 'p_2', 'p_3', 'p_4', 'p_5'],
        'ul': ['ul_1', 'ul_2', 'ul_3', 'ul_4', 'ul_5'],
        'ol': ['ol_1', 'ol_2', 'ol_3', 'ol_4', 'ol_5'],
        'li': ['li_1', 'li_2', 'li_3', 'li_4', 'li_5'],
        'table': ['table_1', 'table_2', 'table_3', 'table_4', 'table_5']
    }

    for tag_name, class_list in ELEMENT_CLASSES.items():
        if tag_name in ['ul', 'ol']:
            for tag in soup.find_all(tag_name):
                tag['class'] = [random.choice(class_list)]
                for li in tag.find_all('li', recursive=False):
                    li['class'] = [random.choice(ELEMENT_CLASSES['li'])]
        elif tag_name == 'li':
            continue
        else:
            for tag in soup.find_all(tag_name):
                if tag_name != 'table' and tag.find_parent('table'):
                    continue
                tag['class'] = [random.choice(class_list)]

    body_content = str(soup)
    logging.info("Clases CSS asignadas a los elementos HTML.")

    # Sanitizar el contenido HTML
    allowed_tags = list(bleach.sanitizer.ALLOWED_TAGS) + ['h2', 'img']
    allowed_attributes = bleach.sanitizer.ALLOWED_ATTRIBUTES.copy()
    allowed_attributes.update({
        'a': ['href', 'title'],
        'img': ['src', 'alt'],
        'table': ['class'],
        'th': ['class'],
        'td': ['class'],
    })
    sanitized_body_content = bleach.clean(body_content, tags=allowed_tags, attributes=allowed_attributes)
    logging.info("Contenido HTML sanitizado.")

    # Extraer título
    title_tag = soup.find('h1')
    title = title_tag.get_text().strip() if title_tag else "Título de la página"
    logging.info(f"Título extraído: {title}")

    # Generar slug
    slug = generate_slug(title)
    logging.info(f"Slug generado: {slug}")

    # Verificar si el slug ya existe y ajustar si es necesario
    original_slug = slug
    counter = 1
    while os.path.exists(os.path.join(OUTPUT_DIRECTORY, slug)):
        slug = f"{original_slug}_{counter}"
        counter += 1
    logging.info(f"Slug final: {slug}")

    # Crear carpeta del post
    post_dir = os.path.join(OUTPUT_DIRECTORY, slug)
    os.makedirs(post_dir, exist_ok=True)
    logging.info(f"Directorio creado para el post: {post_dir}")

    # Renderizar plantilla
    tsx_content = template.render(
        title=title,
        meta_description=f"{title} - {WEBSITE_CONTEXT.strip()}",
        meta_keywords=keywords_str,
        meta_robots=robots_content,
        body_content=sanitized_body_content
    )
    logging.info("Plantilla TSX renderizada con el contenido generado.")

    # Guardar archivo TSX
    page_path = os.path.join(post_dir, 'page.tsx')
    try:
        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(tsx_content)
        logging.info(f'Archivo {slug}/page.tsx creado exitosamente en "{OUTPUT_DIRECTORY}/".')
    except Exception as e:
        logging.error(f"Error al guardar el archivo TSX: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    # =====================================
    # Guardar el Slug en slugs.txt
    # =====================================
    slugs_file_path = os.path.join(OUTPUT_DIRECTORY, 'slugs.txt')
    try:
        if not os.path.exists(slugs_file_path):
            with open(slugs_file_path, 'w', encoding='utf-8') as f:
                f.write("Slugs Generados:\n")
            logging.info(f'Archivo slugs.txt creado en "{OUTPUT_DIRECTORY}/".')

        with open(slugs_file_path, 'a', encoding='utf-8') as f:
            f.write(f"{slug}\n")
        logging.info(f'Slug "{slug}" añadido al archivo slugs.txt.')
    except Exception as e:
        logging.error(f"Error al escribir en slugs.txt: {e}")

    # Preparar el post generado para devolver
    new_post = {
        "title": title,
        "meta_description": f"{title} - {WEBSITE_CONTEXT.strip()}",
        "meta_keywords": keywords_str,
        "meta_robots": robots_content,
        "body_content": sanitized_body_content
    }

    logging.info("Post generado de manera única.")
    return {"post": new_post}

# =====================================
# Endpoint para Obtener Todos los Posts
# =====================================
@app.get("/get-all-posts/")
def get_all_posts():
    try:
        posts = []
        for slug in os.listdir(OUTPUT_DIRECTORY):
            page_path = os.path.join(OUTPUT_DIRECTORY, slug, 'page.tsx')
            if os.path.isfile(page_path):
                with open(page_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                title_match = re.search(r'<title>(.*?)<\/title>', content)
                body_content_match = re.search(r'const body_content = `([\s\S]*?)`;', content)
                if title_match and body_content_match:
                    posts.append({
                        "title": title_match.group(1),
                        "body_content": body_content_match.group(1)
                    })
        return {"posts": posts}
    except Exception as e:
        logging.error(f"Error al obtener todos los posts: {e}")
        raise HTTPException(status_code=500, detail=str(e))
