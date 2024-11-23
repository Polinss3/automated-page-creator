
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando la Actualidad: Artículos y Noticias de Temas de Interés";
  const meta_description = "Explorando la Actualidad: Artículos y Noticias de Temas de Interés - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "noticias, información, artículos, actualidad, temas de interés";
  const meta_robots = "index, follow";
  const body_content = `<h1 class="h1_2">Explorando la Actualidad: Artículos y Noticias de Temas de Interés</h1>
<p class="p_5">Bienvenidos a nuestro portal, donde nos dedicamos a ofrecer una amplia gama de <strong>noticias</strong> y <strong>artículos</strong> que abarcan diversos <strong>temas de interés</strong>. Aquí podrás encontrar información actualizada sobre los acontecimientos más relevantes, así como análisis profundos que te ayudarán a entender mejor la <strong>actualidad</strong>. Nuestro objetivo es proporcionarte contenido de calidad que despierte tu curiosidad y te mantenga informado sobre lo que sucede en el mundo.</p>
<h2>Últimas Noticias</h2>
<table class="table_4">
<tr>
<th>Tema</th>
<th>Fecha</th>
<th>Resumen</th>
</tr>
<tr>
<td>Política</td>
<td>12/10/2023</td>
<td>Análisis de las últimas decisiones gubernamentales y su impacto en la sociedad.</td>
</tr>
<tr>
<td>Economía</td>
<td>11/10/2023</td>
<td>Informe sobre las tendencias económicas actuales y pronósticos futuros.</td>
</tr>
<tr>
<td>Cultura</td>
<td>10/10/2023</td>
<td>Reseñas de eventos culturales y artísticos que marcan la agenda del mes.</td>
</tr>
</table>
<h2>Artículos Destacados</h2>
<ul class="ul_2">
<li class="li_4"><a href="#">El impacto del cambio climático en nuestra vida diaria</a></li>
<li class="li_1"><a href="#">Tendencias tecnológicas que transforman el futuro</a></li>
<li class="li_4"><a href="#">Salud mental: la importancia de hablar sobre ello</a></li>
</ul>
<h2>Conéctate con Nosotros</h2>
<p class="p_1">Te invitamos a seguir nuestras actualizaciones para estar al tanto de la <strong>información</strong> más relevante y los <strong>artículos</strong> que te interesan. ¡No te pierdas nada de la <strong>actualidad</strong>! Síguenos en nuestras redes sociales y suscríbete a nuestro boletín informativo.</p>
<img alt="Noticias y actualidad" src="noticias-actualidad.jpg"/>`;
  
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