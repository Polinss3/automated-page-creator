
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando Temas de Actualidad: Un Recorrido por los Artículos y Noticias más Relevantes";
  const meta_description = "Explorando Temas de Actualidad: Un Recorrido por los Artículos y Noticias más Relevantes - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "artículos, información, actualidad, noticias, temas de interés";
  const meta_robots = "index, follow";
  const body_content = `&lt;h1 class="h1_4"&gt;Explorando Temas de Actualidad: Un Recorrido por los Artículos y Noticias más Relevantes&lt;/h1&gt;
&lt;p class="p_2"&gt;En nuestro sitio web, nos apasiona brindarte la información más actual y relevante en una variedad de temas de interés. Desde la política hasta la cultura, la tecnología hasta la salud, nuestro objetivo es mantenerte informado y comprometido con lo que está sucediendo en el mundo.&lt;/p&gt;
<h2>Artículos y Noticias: Tu Fuente de Información</h2>
&lt;p class="p_4"&gt;Con nuestra amplia selección de artículos y noticias, encontrarás una riqueza de información a tu alcance. Nuestros escritores expertos se dedican a investigar y presentar los hechos de manera clara y concisa, para que puedas obtener la información que necesitas de manera rápida y eficiente.&lt;/p&gt;
&lt;h3&gt;Temas de Interés&lt;/h3&gt;
&lt;p class="p_3"&gt;En nuestra plataforma, cubrimos una variedad de temas de interés, incluyendo:&lt;/p&gt;
<ul>
<li>Política</li>
<li>Ciencia y Tecnología</li>
<li>Salud y Bienestar</li>
<li>Cultura y Arte</li>
<li>Economía y Negocios</li>
</ul>
<h2>La Actualidad a tu Alcance</h2>
&lt;p class="p_3"&gt;Además de nuestra colección de artículos, también ofrecemos noticias de última hora sobre los eventos actuales más importantes. Nuestro equipo de periodistas se mantiene actualizado con los acontecimientos globales, brindándote la información más reciente y relevante en tiempo real.&lt;/p&gt;
&lt;h3&gt;Últimas Noticias&lt;/h3&gt;
&lt;table class="table_3"&gt;
&lt;tr&gt;
&lt;th&gt;Título&lt;/th&gt;
&lt;th&gt;Categoría&lt;/th&gt;
&lt;th&gt;Fecha&lt;/th&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Novedades en Tecnología&lt;/td&gt;
&lt;td&gt;Tecnología&lt;/td&gt;
&lt;td&gt;Fecha Actual&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Avances en Salud&lt;/td&gt;
&lt;td&gt;Salud&lt;/td&gt;
&lt;td&gt;Fecha Actual&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Actualidad Política&lt;/td&gt;
&lt;td&gt;Política&lt;/td&gt;
&lt;td&gt;Fecha Actual&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
&lt;p class="p_1"&gt;Para mantenerse al día con las últimas noticias y artículos, asegúrate de revisar nuestro sitio web regularmente. También puedes seguirnos en nuestras redes sociales para recibir actualizaciones en tiempo real.&lt;/p&gt;
<img alt="Imagen de un periódico con las últimas noticias" src="noticias.jpg">`;
  
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