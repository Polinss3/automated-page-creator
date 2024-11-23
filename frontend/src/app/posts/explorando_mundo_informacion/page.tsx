
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando el Mundo de la Información: Noticias y Artículos de Temas de Interés";
  const meta_description = "Explorando el Mundo de la Información: Noticias y Artículos de Temas de Interés - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "información, actualidad, temas de interés, noticias, artículos";
  const meta_robots = "index, follow";
  const body_content = `<h1 class="h1_4">Explorando el Mundo de la Información: Noticias y Artículos de Temas de Interés</h1>
<p class="p_5">En un mundo donde la <strong>actualidad</strong> cambia a un ritmo vertiginoso, es fundamental contar con un espacio que ofrezca <strong>información</strong> relevante y actual sobre diversos <strong>temas de interés</strong>. Nuestro sitio web se dedica a proporcionar <strong>noticias</strong> y artículos que abordan las cuestiones más importantes y fascinantes del momento. Desde avances científicos hasta tendencias culturales, aquí encontrarás un compendio de información que te mantendrá al día.</p>
<h2>Últimas Noticias</h2>
<table class="table_5">
<tr>
<th>Tema</th>
<th>Fecha</th>
<th>Resumen</th>
</tr>
<tr>
<td>Avances en Energía Renovable</td>
<td>15 de octubre de 2023</td>
<td>Investigaciones recientes revelan nuevas tecnologías en energía solar que podrían transformar el sector.</td>
</tr>
<tr>
<td>Cambios en la Legislación Ambiental</td>
<td>14 de octubre de 2023</td>
<td>Los nuevos proyectos de ley buscan fortalecer la protección de ecosistemas vulnerables a nivel global.</td>
</tr>
<tr>
<td>Tendencias de Consumo Responsable</td>
<td>13 de octubre de 2023</td>
<td>Un análisis sobre cómo los consumidores están optando por productos más sostenibles y éticos.</td>
</tr>
</table>
<h2>Artículos Destacados</h2>
<ul class="ul_2">
<li class="li_4"><a href="#">La Importancia de la Educación Financiera</a> - Un artículo que explora cómo la educación financiera puede cambiar vidas.</li>
<li class="li_4"><a href="#">Cultura Digital: Impacto en la Sociedad Moderna</a> - Un análisis de cómo la tecnología ha transformado nuestras interacciones diarias.</li>
<li class="li_5"><a href="#">Salud Mental en Tiempos de Crisis</a> - Consejos y recursos para cuidar de tu salud mental en situaciones difíciles.</li>
</ul>
<h2>Imágenes que Hablan</h2>
<img alt="Avances en Energía Renovable" src="imagen-energia-renovable.jpg"/>
<img alt="Cambios en la Legislación Ambiental" src="imagen-legislacion-ambiental.jpg"/>
<img alt="Tendencias de Consumo Responsable" src="imagen-consumo-responsable.jpg"/>
<p class="p_3">Mantente informado y no te pierdas de las últimas <strong>noticias</strong> y artículos sobre los <strong>temas de interés</strong> que te apasionan. Nuestro compromiso es ofrecerte <strong>información</strong> veraz y actualizada para que puedas estar al tanto de todo lo que sucede en el mundo.</p>`;
  
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