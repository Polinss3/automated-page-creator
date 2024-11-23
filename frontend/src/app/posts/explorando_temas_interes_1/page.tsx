
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando Temas de Interés: Lo Último en Noticias y Artículos de Actualidad";
  const meta_description = "Explorando Temas de Interés: Lo Último en Noticias y Artículos de Actualidad - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "artículos, actualidad, información, noticias, temas de interés";
  const meta_robots = "index, follow";
  const body_content = `<h1 class="h1_4">Explorando Temas de Interés: Lo Último en Noticias y Artículos de Actualidad</h1>
<p class="p_5">En un mundo en constante cambio, mantenerse informado sobre diversos temas de interés es esencial. Nuestro sitio web se dedica a ofrecer artículos y noticias que abarcan una amplia gama de tópicos, desde la tecnología hasta la cultura, pasando por la salud y el medio ambiente. Aquí, podrás encontrar información actualizada y relevante que te ayudará a comprender mejor los acontecimientos que moldean nuestro entorno.</p>
<h2>Artículos Recientes y Tendencias Actuales</h2>
<p class="p_4">Nos esforzamos por proporcionarte contenido de calidad que refleje la actualidad y las tendencias más relevantes. A continuación, se presenta una tabla con algunos de los artículos más recientes que puedes explorar:</p>
<table class="table_3">
<thead>
<tr>
<th>Título del Artículo</th>
<th>Categoría</th>
<th>Fecha de Publicación</th>
</tr>
</thead>
<tbody>
<tr>
<td>Innovaciones en Tecnología 2023</td>
<td>Tecnología</td>
<td>15 de octubre de 2023</td>
</tr>
<tr>
<td>El Impacto del Cambio Climático en la Salud</td>
<td>Medio Ambiente</td>
<td>12 de octubre de 2023</td>
</tr>
<tr>
<td>Tendencias de Moda para el Otoño</td>
<td>Cultura</td>
<td>10 de octubre de 2023</td>
</tr>
</tbody>
</table>
<h2>Temas de Interés que Debes Conocer</h2>
<ul class="ul_2">
<li class="li_5"><strong>Economía:</strong> Cómo las decisiones políticas afectan tu bolsillo.</li>
<li class="li_1"><strong>Salud:</strong> Nuevas investigaciones sobre enfermedades comunes.</li>
<li class="li_4"><strong>Entretenimiento:</strong> Lo mejor del cine y la música este mes.</li>
<li class="li_3"><strong>Deportes:</strong> Resultados y análisis de las ligas más importantes.</li>
</ul>
<h2>Imágenes de Actualidad</h2>
<p class="p_4">Las imágenes también juegan un papel crucial para entender la actualidad. A continuación, se presentan algunas de las más impactantes que han marcado los últimos eventos:</p>
<img alt="Innovación tecnológica" src="imagen1.jpg"/>
<img alt="Cambio climático" src="imagen2.jpg"/>
<img alt="Tendencias de moda" src="imagen3.jpg"/>
<p class="p_4">Recuerda visitar nuestro sitio frecuentemente para no perderte las últimas noticias y artículos sobre temas de interés que enriquecen tu conocimiento y te mantienen al tanto de la actualidad.</p>`;
  
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