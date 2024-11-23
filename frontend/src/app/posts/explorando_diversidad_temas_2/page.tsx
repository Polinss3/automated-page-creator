
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando la Diversidad de Temas de Interés en la Actualidad";
  const meta_description = "Explorando la Diversidad de Temas de Interés en la Actualidad - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "noticias, artículos, actualidad, temas de interés, información";
  const meta_robots = "index, follow";
  const body_content = `<h1 class="h1_2">Explorando la Diversidad de Temas de Interés en la Actualidad</h1>
<p class="p_4">En un mundo donde la información fluye a una velocidad vertiginosa, mantenerse actualizado sobre diversos temas de interés es más crucial que nunca. Nuestro sitio web se dedica a proporcionar artículos y noticias sobre una amplia gama de temas, desde tecnología y ciencia hasta cultura y entretenimiento. Aquí, encontrarás contenido relevante y de calidad que te permitirá estar informado sobre la actualidad y desarrollar un conocimiento más profundo sobre los asuntos que te interesan.</p>
<h2>Últimas Noticias y Artículos</h2>
<table class="table_1">
<tr>
<th>Título del Artículo</th>
<th>Fecha de Publicación</th>
<th>Categoría</th>
</tr>
<tr>
<td>Nuevas Tendencias en Tecnología para 2023</td>
<td>15 de octubre de 2023</td>
<td>Tecnología</td>
</tr>
<tr>
<td>Los Beneficios de la Meditación en la Vida Cotidiana</td>
<td>10 de octubre de 2023</td>
<td>Salud</td>
</tr>
<tr>
<td>Impacto del Cambio Climático en Nuestros Ecosistemas</td>
<td>5 de octubre de 2023</td>
<td>Medio Ambiente</td>
</tr>
</table>
<h2>Temas de Interés Más Populares</h2>
<ul class="ul_1">
<li class="li_2">Tecnología y su evolución constante</li>
<li class="li_5">Salud y bienestar personal</li>
<li class="li_5">Cultura y entretenimiento contemporáneo</li>
<li class="li_5">Política y actualidad mundial</li>
<li class="li_4">Medio ambiente y sostenibilidad</li>
</ul>
<p class="p_3">Con una variedad de artículos que abarcan estos temas de interés, nuestro objetivo es ofrecerte la información más actualizada y relevante. Además, fomentamos el pensamiento crítico y la discusión sobre las noticias y eventos que impactan nuestras vidas.</p>
<h2>Imágenes de Actualidad</h2>
<img alt="Noticias de Actualidad" src="noticias-actualidad.jpg"/>
<p class="p_3">La imagen anterior representa la esencia de nuestra dedicación a informar sobre los temas más relevantes en la actualidad.</p>`;
  
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