
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Novedades y Tendencias: Artículos de Actualidad que No Te Puedes Perder";
  const meta_description = "Novedades y Tendencias: Artículos de Actualidad que No Te Puedes Perder - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "información, actualidad, noticias, artículos, temas de interés";
  const meta_robots = "index, follow";
  const body_content = `<h1 class="h1_1">Novedades y Tendencias: Artículos de Actualidad que No Te Puedes Perder</h1>
<p class="p_2">En un mundo donde la información fluye a gran velocidad, mantenerse al tanto de las últimas noticias y artículos sobre temas de interés es fundamental. Este sitio web se dedica a ofrecerte contenido exclusivo y actualizado que abarca una amplia gama de tópicos, desde tecnología y ciencia hasta cultura y estilo de vida. Aquí encontrarás todo lo necesario para estar informado y tomar decisiones basadas en la actualidad.</p>
<h2>¿Por Qué Es Importante Estar Informado?</h2>
<p class="p_3">La información precisa y actualizada es clave para comprender el entorno que nos rodea. A través de nuestras secciones, podrás explorar los siguientes temas de interés:</p>
<ul class="ul_2">
<li class="li_4">Tecnología</li>
<li class="li_4">Ciencia</li>
<li class="li_5">Salud</li>
<li class="li_3">Economía</li>
<li class="li_5">Cultura y Entretenimiento</li>
</ul>
<h2>Artículos Recientes</h2>
<table class="table_3">
<thead>
<tr>
<th>Título del Artículo</th>
<th>Fecha de Publicación</th>
<th>Categoría</th>
</tr>
</thead>
<tbody>
<tr>
<td>Innovaciones Tecnológicas que Transformarán el Futuro</td>
<td>15 de octubre de 2023</td>
<td>Tecnología</td>
</tr>
<tr>
<td>Los Avances Médicos Más Prometedores de 2023</td>
<td>10 de octubre de 2023</td>
<td>Salud</td>
</tr>
<tr>
<td>Cómo la Economía Global Afecta Tu Vida Diaria</td>
<td>5 de octubre de 2023</td>
<td>Economía</td>
</tr>
</tbody>
</table>
<h2>Imágenes de Actualidad</h2>
<img alt="Innovaciones tecnológicas" src="https://example.com/imagen1.jpg"/>
<img alt="Avances médicos" src="https://example.com/imagen2.jpg"/>
<p class="p_3">Te invitamos a explorar cada sección para descubrir artículos profundos y análisis sobre las noticias más relevantes. Mantente informado y participa en la conversación sobre los temas que realmente importan.</p>`;
  
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