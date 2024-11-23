
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando la Diversidad de Temas de Interés en la Actualidad";
  const meta_description = "Explorando la Diversidad de Temas de Interés en la Actualidad - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "actualidad, artículos, noticias, información, temas de interés";
  const meta_robots = "index, follow";
  const body_content = `<h1 class="h1_3">Explorando la Diversidad de Temas de Interés en la Actualidad</h1>
<p class="p_4">En un mundo en constante cambio, mantenerse informado sobre los temas de interés más relevantes es esencial. Nuestro sitio web se dedica a ofrecer artículos y noticias de actualidad que abarcan diversas áreas, desde tecnología y salud hasta cultura y medio ambiente. Aquí, los lectores pueden encontrar información valiosa que les permita entender mejor el mundo que les rodea.</p>
<h2>Artículos Destacados</h2>
<table class="table_2">
<tr>
<th>Título</th>
<th>Fecha de Publicación</th>
<th>Categoría</th>
</tr>
<tr>
<td>Las Últimas Innovaciones en Tecnología</td>
<td>15 de octubre de 2023</td>
<td>Tecnología</td>
</tr>
<tr>
<td>Impacto del Cambio Climático en la Salud Pública</td>
<td>10 de octubre de 2023</td>
<td>Medio Ambiente</td>
</tr>
<tr>
<td>Nuevas Tendencias en el Arte Contemporáneo</td>
<td>5 de octubre de 2023</td>
<td>Cultura</td>
</tr>
</table>
<h2>Temas de Interés en Nuestras Noticias</h2>
<ul class="ul_1">
<li class="li_1">Tecnología y su impacto en la vida diaria</li>
<li class="li_4">Salud y bienestar: consejos para una vida saludable</li>
<li class="li_2">Cultura y entretenimiento: lo último en cine y música</li>
<li class="li_4">Medio ambiente: acciones para un futuro sostenible</li>
<li class="li_4">Economía y finanzas: tendencias y consejos para ahorrar</li>
</ul>
<h2>Imágenes que Hablan</h2>
<p class="p_1">Para una mejor comprensión de los temas tratados, incluimos imágenes relevantes que ilustran nuestras noticias y artículos:</p>
<img alt="Innovaciones Tecnológicas" src="tecnologia.jpg"/>
<img alt="Cambio Climático" src="cambio_climatico.jpg"/>
<img alt="Arte Contemporáneo" src="arte_contemporaneo.jpg"/>
<p class="p_5">En nuestro sitio web, la información se presenta de manera clara y accesible, permitiendo que todos puedan disfrutar de la lectura y mantenerse al tanto de la actualidad. Te invitamos a explorar nuestros artículos y noticias para enriquecer tu conocimiento sobre los temas que realmente importan. ¡No te lo pierdas!</p>`;
  
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