# create_products.py

import os
import csv
import openai
import random
import unicodedata
import string
import importlib
import re

from config import (
    API_KEY,
    MODEL_NAME,
    ALLOW_SEARCH_ENGINES,
)

from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup

# Configurar la clave de API
openai.api_key = API_KEY

# Configurar Jinja2
env = Environment(loader=FileSystemLoader('layouts'))
template = env.get_template('product.html')

# Importar la configuración específica para productos
try:
    content_config = importlib.import_module('configs.product_config')
except ModuleNotFoundError:
    raise ValueError("Configuración para 'product' no encontrada.")

# Obtener el contexto y las palabras clave para productos
WEBSITE_CONTEXT = content_config.WEBSITE_CONTEXT.strip()
KEYWORDS_LIST = content_config.SEO_KEYWORDS
USER_PROMPT_TEMPLATE = content_config.USER_PROMPT
TABLE_CLASSES = content_config.TABLE_CLASSES  # Si es necesario

# Definir las clases específicas para cada tipo de elemento
ELEMENT_CLASSES = {
    'h1': ['h1_1', 'h1_2', 'h1_3', 'h1_4', 'h1_5'],
    'h2': ['h2_1', 'h2_2', 'h2_3', 'h2_4', 'h2_5'],
    'p': ['p_1', 'p_2', 'p_3', 'p_4', 'p_5'],
    'ul': ['ul_1', 'ul_2', 'ul_3', 'ul_4', 'ul_5'],
    'ol': ['ol_1', 'ol_2', 'ol_3', 'ol_4', 'ol_5'],
    'li': ['li_1', 'li_2', 'li_3', 'li_4', 'li_5'],
    'img': ['img_1', 'img_2', 'img_3', 'img_4', 'img_5'],  # Opcional: si deseas clases para imágenes
    # Añade otros elementos si es necesario
}

# Crear el directorio de salida si no existe
output_dir = os.path.join('outputs', 'products')
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

# Definir el valor de la meta etiqueta robots
robots_content = 'index, follow' if ALLOW_SEARCH_ENGINES else 'noindex, nofollow'

# Función para generar un nombre de archivo a partir del nombre del producto
def generate_filename_from_name(name, max_length=50):
    # Normalizar el nombre para eliminar acentos y caracteres especiales
    name_normalized = unicodedata.normalize('NFKD', name)
    name_encoded = name_normalized.encode('ascii', 'ignore').decode('ascii')
    # Convertir a minúsculas
    name_lower = name_encoded.lower()
    # Reemplazar espacios y caracteres no permitidos por guiones bajos
    allowed_chars = string.ascii_lowercase + string.digits + '_-'
    filename_clean = ''.join(c if c in allowed_chars else '_' for c in name_lower.replace(' ', '_'))
    # Limitar la longitud del nombre de archivo
    filename_base = filename_clean[:max_length]
    # Asegurarse de que el nombre no esté vacío
    if not filename_base:
        filename_base = 'producto'
    return filename_base

# Leer el archivo CSV
with open('products.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        product_name = row['name']
        price = row['price']
        main_image = row['main_image']
        secondary_image = row['secondary_image']

        # Preparar el prompt para ChatGPT
        selected_keywords = random.sample(KEYWORDS_LIST, min(len(KEYWORDS_LIST), 5))
        keywords_str = ', '.join(selected_keywords)

        user_prompt = f"""
        A continuación se proporciona información básica sobre un producto:

        - Nombre del producto: {product_name}
        - Precio: {price}

        Necesito que generes el siguiente contenido relacionado con este producto:

        - Un **subtítulo H2** atractivo que complemente el nombre del producto.
        - Una **descripción detallada** del producto en uno o dos párrafos.
        - Una **lista** de características destacadas del producto (5 elementos).

        Asegúrate de que el contenido esté relacionado con el siguiente contexto del sitio web:
        {WEBSITE_CONTEXT}

        - No incluyas clases CSS en ninguna etiqueta; el sistema asignará las clases adecuadas automáticamente.
        - Proporciona el contenido en formato **HTML válido**, incluyendo las etiquetas correspondientes.
        - No incluyas explicaciones adicionales ni delimitadores de código.
        - Asegúrate de que el HTML sea válido y bien formado.
        """

        # Definir el mensaje para OpenAI
        messages = [
            {
                "role": "system",
                "content": "Eres un asistente que ayuda a generar descripciones de productos para una tienda en línea.",
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ]

        # Realizar la solicitud a la API de OpenAI
        try:
            response = openai.ChatCompletion.create(
                model=MODEL_NAME,
                messages=messages,
                max_tokens=500,
                temperature=0.7,
                n=1,
                stop=None,
            )
        except openai.error.OpenAIError as e:
            print(f"Error al generar contenido para {product_name}: {e}")
            continue

        # Obtener el contenido generado
        generated_content = response['choices'][0]['message']['content'].strip()

        # Procesar el contenido generado
        # Remover cualquier texto antes o después del HTML
        html_start = generated_content.find('<')
        html_end = generated_content.rfind('>') + 1
        html_content = generated_content[html_start:html_end] if html_start != -1 and html_end != -1 else ''

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

                    # Seleccionar la clase para los 'li' dentro de esta lista
                    li_class_list = ELEMENT_CLASSES['li']
                    # Asignar una clase aleatoria para los 'li' de esta lista
                    random_li_class = random.choice(li_class_list)

                    # Asignar la misma clase a todos los 'li' hijos de este 'ul' o 'ol'
                    for li in tag.find_all('li', recursive=False):
                        li['class'] = [random_li_class]
            elif tag_name == 'li':
                # Ya hemos asignado clases a los 'li' dentro de 'ul' o 'ol', así que omitimos este paso
                continue
            else:
                for tag in soup.find_all(tag_name):
                    # Asignar una clase aleatoria del conjunto correspondiente
                    random_class = random.choice(class_list)
                    tag['class'] = [random_class]

        # Generar el nombre de archivo basado en el nombre del producto
        filename_base = generate_filename_from_name(product_name)
        filename = f'{filename_base}.html'

        # Asegurar que el nombre de archivo sea único
        counter = 1
        while os.path.exists(os.path.join(output_dir, filename)):
            filename = f'{filename_base}_{counter}.html'
            counter += 1

        # Generar la meta descripción
        meta_description = f"{product_name} - {WEBSITE_CONTEXT}"

        # Definir el contenido completo
        # Crear el título H1 con clase asignada
        h1_class = random.choice(ELEMENT_CLASSES['h1'])
        h1_tag_html = f'<h1 class="{h1_class}">{product_name}</h1>'

        # Crear las imágenes con clases asignadas
        img_main_class = random.choice(ELEMENT_CLASSES['img'])
        img_main_html = f'<img class="{img_main_class}" src="{main_image}" alt="{product_name} imagen principal">'

        img_secondary_class = random.choice(ELEMENT_CLASSES['img'])
        img_secondary_html = f'<img class="{img_secondary_class}" src="{secondary_image}" alt="{product_name} imagen secundaria">'

        # Construir el contenido completo
        full_content = f"""
        {h1_tag_html}
        {img_main_html}
        {str(soup)}
        {img_secondary_html}
        """

        # Definir variables adicionales para la plantilla
        template_vars = {
            'title': product_name,
            'meta_description': meta_description,
            'meta_keywords': keywords_str,
            'meta_robots': robots_content,
            'body_content': full_content,
        }

        # Renderizar la plantilla
        html_output = template.render(**template_vars)

        # Guardar el contenido generado en un nuevo archivo HTML
        with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
            f.write(html_output)

        print(f'Archivo {filename} creado exitosamente en la carpeta "{output_dir}/".')
