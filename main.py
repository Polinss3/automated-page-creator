# main.py

import os
import re
import openai
import random
import unicodedata
import string
import importlib

from config import (
    API_KEY,
    MODEL_NAME,
    OUTPUT_DIRECTORY,
    CONTENT_TYPE,
    ALLOW_SEARCH_ENGINES,
)

from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup

# Configurar la clave de API
openai.api_key = API_KEY

# Configurar Jinja2
env = Environment(loader=FileSystemLoader('layouts'))

# Seleccionar la plantilla adecuada según el tipo de contenido
template_name = f'{CONTENT_TYPE}.html'
template = env.get_template(template_name)

# Importar la configuración específica del tipo de contenido
try:
    content_config = importlib.import_module(f'configs.{CONTENT_TYPE}_config')
except ModuleNotFoundError:
    raise ValueError(f"Tipo de contenido '{CONTENT_TYPE}' no soportado.")

# Obtener el contexto y las palabras clave para el tipo de contenido seleccionado
WEBSITE_CONTEXT = content_config.WEBSITE_CONTEXT
KEYWORDS_LIST = content_config.SEO_KEYWORDS
USER_PROMPT_TEMPLATE = content_config.USER_PROMPT
TABLE_CLASSES = content_config.TABLE_CLASSES  # Clases para tablas

# Definir las clases específicas para cada tipo de elemento
ELEMENT_CLASSES = {
    'h1': ['h1_1', 'h1_2', 'h1_3', 'h1_4', 'h1_5'],
    'p': ['p_1', 'p_2', 'p_3', 'p_4', 'p_5'],
    'ul': ['ul_1', 'ul_2', 'ul_3', 'ul_4', 'ul_5'],
    'ol': ['ol_1', 'ol_2', 'ol_3', 'ol_4', 'ol_5'],
    'li': ['li_1', 'li_2', 'li_3', 'li_4', 'li_5'],
    'table': ['table_1', 'table_2', 'table_3', 'table_4', 'table_5'],
    # Añade otros elementos si es necesario
}

# Crear el directorio de salida específico si no existe
output_dir = os.path.join(OUTPUT_DIRECTORY, CONTENT_TYPE + 's')  # Ejemplo: outputs/posts
os.makedirs(output_dir, exist_ok=True)

# Leer los títulos existentes para evitar repeticiones
existing_titles = []
for filename in os.listdir(output_dir):
    if filename.endswith('.html'):
        with open(os.path.join(output_dir, filename), 'r', encoding='utf-8') as f:
            content = f.read()
            # Extraer el título existente
            match = re.search(r'<title>(.*?)</title>', content)
            if match:
                existing_titles.append(match.group(1))

# Seleccionar aleatoriamente algunas palabras clave para incluir en el contenido
selected_keywords = random.sample(KEYWORDS_LIST, min(len(KEYWORDS_LIST), 5))  # Selecciona hasta 5 palabras clave

# Convertir la lista de palabras clave en una cadena
keywords_str = ', '.join(selected_keywords)

# Definir el valor de la meta etiqueta robots
robots_content = 'index, follow' if ALLOW_SEARCH_ENGINES else 'noindex, nofollow'

# Preparar el mensaje de usuario
user_prompt = USER_PROMPT_TEMPLATE.format(
    WEBSITE_CONTEXT=WEBSITE_CONTEXT.strip(),
    keywords_str=keywords_str,
    existing_titles='\n'.join(existing_titles),
)

# Definir el mensaje para OpenAI
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

# Realizar la solicitud a la API de OpenAI
response = openai.ChatCompletion.create(
    model=MODEL_NAME,
    messages=messages,
    max_tokens=1500,
    temperature=0.7,
    n=1,
    stop=None,
)

# Obtener el contenido generado
generated_content = response['choices'][0]['message']['content'].strip()

# Procesar el contenido generado
# Remover cualquier texto antes o después del HTML
html_start = generated_content.find('<')
html_end = generated_content.rfind('>') + 1
html_content = generated_content[html_start:html_end]

# Usar BeautifulSoup para procesar el HTML y asignar clases
soup = BeautifulSoup(html_content, 'html.parser')

# Remover todas las clases existentes asignadas por el modelo
for tag in soup.find_all():
    if 'class' in tag.attrs:
        del tag['class']

# Asignar clases específicas a cada tipo de elemento
for tag_name, class_list in ELEMENT_CLASSES.items():
    # Para 'ul' y 'ol', asignar clases y luego asignar la misma clase a sus 'li' hijos
    if tag_name in ['ul', 'ol']:
        for tag in soup.find_all(tag_name):
            # Asignar una clase aleatoria al 'ul' o 'ol'
            random_class = random.choice(class_list)
            tag['class'] = [random_class]

            # Seleccionar la clase correspondiente para los 'li'
            li_class_list = ELEMENT_CLASSES['li']
            # Asignar una clase aleatoria para los 'li' dentro de esta lista
            random_li_class = random.choice(li_class_list)

            # Asignar la misma clase a todos los 'li' hijos de este 'ul' o 'ol'
            for li in tag.find_all('li', recursive=False):
                li['class'] = [random_li_class]
    elif tag_name == 'li':
        # Ya hemos asignado clases a los 'li' dentro de 'ul' o 'ol', así que omitimos este paso
        continue
    else:
        for tag in soup.find_all(tag_name):
            # No asignar clases a elementos dentro de una tabla, excepto para <table>
            if tag_name != 'table' and tag.find_parent('table') is not None:
                continue
            # Asignar una clase aleatoria del conjunto correspondiente
            random_class = random.choice(class_list)
            tag['class'] = [random_class]

# Convertir el contenido HTML modificado a cadena
body_content = str(soup)

# Extraer el título del contenido
title_tag = soup.find('h1')
if title_tag:
    title = title_tag.get_text()
else:
    title = "Título de la página"

# Generar el nombre de archivo a partir del título
def generate_filename_from_title(title, max_words=3, max_length=50):
    # Normalizar el título para eliminar acentos y caracteres especiales
    title_normalized = unicodedata.normalize('NFKD', title)
    title_encoded = title_normalized.encode('ascii', 'ignore').decode('ascii')
    # Convertir a minúsculas
    title_lower = title_encoded.lower()
    # Eliminar caracteres no alfanuméricos (excepto espacios)
    allowed_chars = string.ascii_lowercase + string.digits + ' '
    title_clean = ''.join(c for c in title_lower if c in allowed_chars)
    # Dividir en palabras
    words = title_clean.strip().split()
    # Lista de palabras vacías en español
    stopwords = {'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'en', 'y', 'a', 'por', 'para', 'con', 'sin', 'sobre', 'entre', 'del', 'al', 'tu', 'su', 'es', 'que'}
    # Filtrar palabras vacías
    meaningful_words = [word for word in words if word not in stopwords]
    # Tomar las primeras palabras significativas
    filename_words = meaningful_words[:max_words]
    # Reemplazar espacios por guiones bajos
    filename_base = '_'.join(filename_words)
    # Limitar la longitud del nombre de archivo
    filename_base = filename_base[:max_length]
    # Asegurarse de que el nombre no esté vacío
    if not filename_base:
        filename_base = 'pagina'
    return filename_base

filename_base = generate_filename_from_title(title)
filename = f'{filename_base}.html'

# Asegurar que el nombre de archivo sea único
counter = 1
original_filename = filename
while os.path.exists(os.path.join(output_dir, filename)):
    filename = f'{filename_base}_{counter}.html'
    counter += 1

# Generar la meta descripción (puedes ajustar esto según tus necesidades)
meta_description = f"{title} - {WEBSITE_CONTEXT.strip()}"

# Definir variables adicionales para la plantilla
template_vars = {
    'title': title,
    'meta_description': meta_description,
    'meta_keywords': keywords_str,
    'meta_robots': robots_content,
    'body_content': body_content,
}

# Renderizar la plantilla
html_content = template.render(**template_vars)

# Guardar el contenido generado en un nuevo archivo HTML
with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f'Archivo {filename} creado exitosamente en la carpeta "{output_dir}/".')

