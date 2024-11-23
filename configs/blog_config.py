# configs/blog_config.py

# Contexto para 'blog'
WEBSITE_CONTEXT = """
Este sitio web es un blog personal que comparte experiencias, consejos y reflexiones sobre la vida cotidiana.
"""

# Palabras clave para 'blog'
SEO_KEYWORDS = [
    'blog',
    'experiencias',
    'consejos',
    'reflexiones',
    'vida cotidiana',
]

# Plantilla del prompt para 'blog'
USER_PROMPT = """
Debes crear el contenido para una entrada de blog que contenga:

- Un **título único** que no se repita con los títulos existentes.
- Uno o más **párrafos** relacionados con el siguiente contexto del sitio web:
  {WEBSITE_CONTEXT}

- Incluir {structure_elements} en el contenido.
- Asegúrate de que el contenido esté relacionado con las siguientes **palabras clave** para optimizar el SEO:
  {keywords_str}

**Notas importantes**:

- Proporciona el contenido en formato **Markdown** con los encabezados y elementos correspondientes.
- El título debe ser de nivel 1 (`# Título`).
- Utiliza subtítulos de nivel 2 (`## Subtítulo`) si es relevante.
- No incluyas el `<head>` ni el `<body>`, solo el contenido.
- No incluyas explicaciones adicionales ni delimitadores de código.

A continuación se muestran los títulos existentes para evitar repeticiones:

{existing_titles}
"""
