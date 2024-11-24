
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Descubre el Mundo: Artículos y Noticias sobre Temas Actuales de Interés";
  const meta_description = "Descubre el Mundo: Artículos y Noticias sobre Temas Actuales de Interés - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "actualidad, temas de interés, información, artículos, noticias";
  const meta_robots = "index, follow";
  const body_content = `&lt;h1 class="h1_5"&gt;Descubre el Mundo: Artículos y Noticias sobre Temas Actuales de Interés&lt;/h1&gt;

Contenido:
&lt;p class="p_1"&gt;En este espacio digital, aspiramos a ser tu fuente confiable de noticias y artículos sobre temas de actualidad. Aquí encontrarás información detallada y precisa sobre una amplia gama de temas, desde avances científicos hasta políticas globales, pasando por la economía y la cultura. Mantente en contacto con el mundo y descubre lo que está sucediendo a tu alrededor con nosotros.&lt;/p&gt;
<img alt="Imagen de un globo terráqueo" src="https://example.com/globe_image.jpg">
<h2>Tabla de Contenidos</h2>
<ol>
<li><a href="#world-politics">Política Mundial</a></li>
<li><a href="#global-economy">Economía Global</a></li>
<li><a href="#latest-science">Últimos Avances en Ciencia</a></li>
<li><a href="#culture-around-the-world">Cultura alrededor del Mundo</a></li>
</ol>
<h2>Política Mundial</h2>
&lt;p class="p_3"&gt;La dinámica política global está en constante cambio. Cubrimos las últimas noticias y proporcionamos análisis detallados sobre las tendencias y acontecimientos más relevantes.&lt;/p&gt;
<h2>Economía Global</h2>
&lt;p class="p_4"&gt;Con las fluctuaciones económicas a nivel mundial, es crucial mantenerse informado. Nuestros artículos proporcionan información detallada y análisis de las tendencias económicas actuales.&lt;/p&gt;
<h2>Últimos Avances en Ciencia</h2>
&lt;table class="table_3"&gt;
&lt;tr&gt;
&lt;th&gt;Fecha&lt;/th&gt;
&lt;th&gt;Noticias de Ciencia&lt;/th&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;20/04/2022&lt;/td&gt;
&lt;td&gt;Descubrimiento de una nueva partícula subatómica&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;23/04/2022&lt;/td&gt;
&lt;td&gt;Avances en la terapia génica para tratar enfermedades raras&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
<h2>Cultura alrededor del Mundo</h2>
&lt;p class="p_2"&gt;Cubrimos una variedad de temas culturales, desde arte y música hasta literatura y cine. Nuestros artículos ofrecen una visión detallada de lo que está sucediendo en el mundo cultural.&lt;/p&gt;
<h2>Conclusión</h2>
&lt;p class="p_3"&gt;En este mundo en constante cambio, la información es poder. Mantente al día con las últimas noticias y artículos sobre diversos temas de interés. Continúa visitándonos para estar informado y descubrir el mundo a través de nuestros ojos.&lt;/p&gt;`;

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