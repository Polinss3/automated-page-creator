# create_products.py

import os
import csv
import openai
import random
import unicodedata
import string
import importlib
import re
import json
import time

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

# Función para generar un slug a partir del nombre del producto
def generate_slug(name: str, existing_slugs: set) -> str:
    """
    Genera un slug único a partir del nombre del producto.
    Reemplaza espacios y caracteres no permitidos por guiones.
    Asegura que el slug sea único agregando un sufijo si es necesario.
    """
    # Normalizar el nombre para eliminar acentos y caracteres especiales
    name_normalized = unicodedata.normalize('NFKD', name)
    name_encoded = name_normalized.encode('ascii', 'ignore').decode('ascii')
    # Convertir a minúsculas
    name_lower = name_encoded.lower()
    # Reemplazar espacios y caracteres no permitidos por guiones
    slug = re.sub(r'[^a-z0-9]+', '-', name_lower).strip('-')
    # Asegurarse de que el slug no esté vacío
    slug = slug or 'producto'
    
    # Si el slug ya existe, agregar un sufijo incremental para hacerlo único
    original_slug = slug
    counter = 1
    while slug in existing_slugs:
        slug = f"{original_slug}-{counter}"
        counter += 1
    
    return slug

# Crear el directorio de datos si no existe
data_dir = os.path.join('frontend', 'data')
os.makedirs(data_dir, exist_ok=True)  # Crea 'frontend/data/' si no existe

# Ruta del archivo JSON
json_path = os.path.join(data_dir, 'products.json')

# Leer los productos existentes para evitar duplicados y recopilar slugs
existing_products = []
existing_slugs = set()

if os.path.exists(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        try:
            existing_products = json.load(f)
            for product in existing_products:
                # Verificar si el producto ya tiene un 'slug'
                if 'slug' in product and product['slug']:
                    existing_slugs.add(product['slug'])
                else:
                    # Generar un slug si no existe
                    slug = generate_slug(product['name'], existing_slugs)
                    product['slug'] = slug
                    existing_slugs.add(slug)
        except json.JSONDecodeError:
            print(f"Advertencia: No se pudo decodificar el archivo JSON existente '{json_path}'. Se sobrescribirá.")
            existing_products = []
            existing_slugs = set()

# Crear una lista para almacenar los nuevos productos
new_products = []

# Leer el archivo CSV
csv_path = 'products.csv'
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"El archivo CSV '{csv_path}' no se encuentra en el directorio actual.")

with open(csv_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        product_name = row['name']
        price = row['price']
        main_image = row['main_image']
        secondary_image = row['secondary_image']

        # Evitar productos con nombres duplicados (ignorando mayúsculas/minúsculas)
        if any(product['name'].lower() == product_name.lower() for product in existing_products):
            print(f"Advertencia: El producto '{product_name}' ya existe. Se omitirá.")
            continue

        # Generar el slug a partir del nombre del producto
        slug = generate_slug(product_name, existing_slugs)
        existing_slugs.add(slug)  # Añadir el slug al conjunto de slugs existentes

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
            print(f"Error al generar contenido para '{product_name}': {e}")
            continue

        # Obtener el contenido generado
        generated_content = response['choices'][0]['message']['content'].strip()

        # Procesar el contenido generado
        # Remover cualquier texto antes o después del HTML
        html_start = generated_content.find('<')
        html_end = generated_content.rfind('>') + 1
        html_content = generated_content[html_start:html_end] if html_start != -1 and html_end != -1 else ''

        # Usar BeautifulSoup para procesar el HTML y extraer contenido
        soup = BeautifulSoup(html_content, 'html.parser')

        # Extraer subtítulo H2
        h2_tag = soup.find('h2')
        subtitle = h2_tag.get_text(strip=True) if h2_tag else ''

        # Extraer descripción
        p_tag = soup.find('p')
        description = p_tag.get_text(strip=True) if p_tag else ''

        # Extraer lista de características
        ul_tag = soup.find(['ul', 'ol'])
        features = [li.get_text(strip=True) for li in ul_tag.find_all('li')] if ul_tag else []

        # Agregar el producto a la lista
        product = {
            "name": product_name,
            "slug": slug,
            "price": price,
            "main_image": main_image,
            "secondary_image": secondary_image,
            "subtitle": subtitle,
            "description": description,
            "features": features
        }

        new_products.append(product)

        print(f'Contenido generado para "{product_name}" con slug "{slug}".')

# Combinar productos existentes con los nuevos
combined_products = existing_products + new_products

# Guardar los productos en un archivo JSON
with open(json_path, 'w', encoding='utf-8') as jsonfile:
    json.dump(combined_products, jsonfile, ensure_ascii=False, indent=4)

print(f'Todos los productos han sido generados y guardados en {json_path}')
