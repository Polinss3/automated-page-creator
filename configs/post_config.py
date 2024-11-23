# configs/post_config.py

# Contexto para 'post'
WEBSITE_CONTEXT = """
Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.
"""

# Palabras clave para 'post'
SEO_KEYWORDS = [
    'artículos',
    'noticias',
    'información',
    'temas de interés',
    'actualidad',
]

# Clases CSS disponibles para tablas
TABLE_CLASSES = ['table_1', 'table_2', 'table_3', 'table_4', 'table_5']

# Plantilla del prompt para 'post'
USER_PROMPT = """
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
