
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando la Actualidad: Información y Noticias en Temas de Interés";
  const meta_description = "Explorando la Actualidad: Información y Noticias en Temas de Interés - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "noticias, información, actualidad, temas de interés, artículos";
  const meta_robots = "index, follow";
  const body_content = `&lt;h1 class="h1_5"&gt;Explorando la Actualidad: Información y Noticias en Temas de Interés&lt;/h1&gt;
&lt;p class="p_1"&gt;En un mundo en constante cambio, mantenerse informado es más importante que nunca. En este artículo, desentrañaremos las últimas noticias y ofreceremos información relevante sobre una variedad de temas de interés. Desde política y economía hasta ciencia y cultura, cubrimos todo con el objetivo de mantener a nuestros lectores bien informados y actualizados.&lt;/p&gt;
<img alt="Imagen de noticias" src="https://example.com/news_image.jpg">
<h2>Tabla de Contenidos</h2>
<ol>
<li><a href="#politics">Política</a></li>
<li><a href="#economy">Economía</a></li>
<li><a href="#science">Ciencia</a></li>
<li><a href="#culture">Cultura</a></li>
</ol>
<h2>Política</h2>
&lt;p class="p_5"&gt;La política puede ser un campo complejo y en constante evolución. Aquí, desglosamos las últimas noticias políticas y proporcionamos información detallada sobre los eventos actuales más relevantes.&lt;/p&gt;
<h2>Economía</h2>
&lt;p class="p_3"&gt;La economía global está interconectada como nunca antes. Desde los mercados de valores hasta las tendencias de consumo, proporcionamos análisis en profundidad de las últimas noticias económicas.&lt;/p&gt;
<h2>Ciencia</h2>
&lt;table class="table_3"&gt;
&lt;tr&gt;
&lt;th&gt;Fecha&lt;/th&gt;
&lt;th&gt;Noticias de Ciencia&lt;/th&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;12/04/2022&lt;/td&gt;
&lt;td&gt;Descubrimiento de una nueva especie de dinosaurio en Argentina&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;15/04/2022&lt;/td&gt;
&lt;td&gt;Avances en la investigación de la vacuna contra el VIH&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
<h2>Cultura</h2>
&lt;p class="p_2"&gt;Desde el arte y la música hasta la literatura y el cine, nuestra sección de cultura cubre una amplia gama de temas. Descubre las últimas noticias e información sobre lo que está sucediendo en el mundo de la cultura.&lt;/p&gt;
<h2>Conclusión</h2>
&lt;p class="p_4"&gt;En este mundo en constante cambio, es vital mantenerse informado. Ya sea que te interese la política, la economía, la ciencia o la cultura, ofrecemos noticias e información de calidad en todos estos temas de interés. Mantente conectado, mantente informado.&lt;/p&gt;`;

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