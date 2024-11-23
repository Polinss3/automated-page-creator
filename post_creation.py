# post_creation.py

import os
import re
import openai
import random
import unicodedata
import string
from jinja2 import Environment, BaseLoader
from bs4 import BeautifulSoup

# Configuración
API_KEY = ""
MODEL_NAME = 'gpt-4o-mini'  # Modelo solicitado
OUTPUT_DIRECTORY = 'frontend/src/app/posts'
ALLOW_SEARCH_ENGINES = True

# Contexto y palabras clave
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

TABLE_CLASSES = ['table_1', 'table_2', 'table_3', 'table_4', 'table_5']

# Plantilla del prompt
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
- Asegúrate de que el HTML sea válido y bien formado.

A continuación se muestran los títulos existentes para evitar repeticiones:

{existing_titles}
"""

# Plantilla TSX (cadena raw para evitar problemas de escape)
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

# Función para generar slug
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

# Inicializar Jinja2
env = Environment(loader=BaseLoader())
template = env.from_string(POST_TEMPLATE)

# Crear directorio de posts si no existe
os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)

# Leer títulos existentes
existing_titles = []
for root, dirs, files in os.walk(OUTPUT_DIRECTORY):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                match = re.search(r'<title>(.*?)</title>', content)
                if match:
                    existing_titles.append(match.group(1))

# Seleccionar palabras clave
selected_keywords = random.sample(SEO_KEYWORDS, min(len(SEO_KEYWORDS), 5))
keywords_str = ', '.join(selected_keywords)

# Robots
robots_content = 'index, follow' if ALLOW_SEARCH_ENGINES else 'noindex, nofollow'

# Preparar prompt
user_prompt = USER_PROMPT_TEMPLATE.format(
    WEBSITE_CONTEXT=WEBSITE_CONTEXT.strip(),
    keywords_str=keywords_str,
    existing_titles='\n'.join(existing_titles),
)

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
response = openai.ChatCompletion.create(
    model=MODEL_NAME,
    messages=messages,
    max_tokens=1500,
    temperature=0.7,
    n=1,
    stop=None,
)

generated_content = response['choices'][0]['message']['content'].strip()

# Procesar HTML
html_start = generated_content.find('<')
html_end = generated_content.rfind('>') + 1
html_content = generated_content[html_start:html_end]

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

# Extraer título
title_tag = soup.find('h1')
title = title_tag.get_text() if title_tag else "Título de la página"

# Generar slug
slug = generate_slug(title)

# Verificar si el slug ya existe y ajustar si es necesario
original_slug = slug
counter = 1
while os.path.exists(os.path.join(OUTPUT_DIRECTORY, slug)):
    slug = f"{original_slug}_{counter}"
    counter += 1

# Crear carpeta del post
post_dir = os.path.join(OUTPUT_DIRECTORY, slug)
os.makedirs(post_dir, exist_ok=True)

# Renderizar plantilla
tsx_content = template.render(
    title=title,
    meta_description=f"{title} - {WEBSITE_CONTEXT.strip()}",
    meta_keywords=keywords_str,
    meta_robots=robots_content,
    body_content=body_content
)

# Guardar archivo TSX
page_path = os.path.join(post_dir, 'page.tsx')
with open(page_path, 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print(f'Archivo {slug}/page.tsx creado exitosamente en "{OUTPUT_DIRECTORY}/".')
