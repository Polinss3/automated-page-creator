
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando los Temas de Interés Más Relevantes en la Actualidad";
  const meta_description = "Explorando los Temas de Interés Más Relevantes en la Actualidad - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "temas de interés, artículos, actualidad, información, noticias";
  const meta_robots = "index, follow";
  const body_content = `&lt;h1 class="h1_5"&gt;Explorando los Temas de Interés Más Relevantes en la Actualidad&lt;/h1&gt;
&lt;p class="p_1"&gt;En un mundo en constante cambio, mantenerse informado sobre los temas de interés más relevantes es fundamental. Este sitio web se dedica a ofrecer artículos y noticias actualizadas que abordan una variedad de tópicos que capturan la atención del público. Desde avances tecnológicos hasta cuestiones sociales, nuestra misión es proporcionar información precisa y accesible que permita a nuestros lectores estar al día con la actualidad.&lt;/p&gt;
<h2>Artículos Destacados</h2>
<ul>
<li><strong>Tecnología:</strong> Últimos avances en inteligencia artificial y su impacto en la sociedad.</li>
<li><strong>Salud:</strong> Nuevas investigaciones sobre bienestar mental y físico.</li>
<li><strong>Medio Ambiente:</strong> Estrategias para combatir el cambio climático y promover la sostenibilidad.</li>
<li><strong>Cultura:</strong> Tendencias actuales en el arte y la música.</li>
</ul>
<h2>Tabla de Temas de Interés</h2>
&lt;table class="table_1"&gt;
&lt;thead&gt;
&lt;tr&gt;
&lt;th&gt;Tema&lt;/th&gt;
&lt;th&gt;Descripción&lt;/th&gt;
&lt;th&gt;Última Actualización&lt;/th&gt;
&lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
&lt;tr&gt;
&lt;td&gt;Tecnología&lt;/td&gt;
&lt;td&gt;Desarrollo de nuevas herramientas y su impacto en la vida diaria.&lt;/td&gt;
&lt;td&gt;Octubre 2023&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Salud&lt;/td&gt;
&lt;td&gt;Investigaciones recientes sobre enfermedades y tratamientos innovadores.&lt;/td&gt;
&lt;td&gt;Septiembre 2023&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Economía&lt;/td&gt;
&lt;td&gt;Análisis de las tendencias económicas y su influencia en el mercado global.&lt;/td&gt;
&lt;td&gt;Octubre 2023&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Medio Ambiente&lt;/td&gt;
&lt;td&gt;Proyectos y políticas para proteger nuestro planeta.&lt;/td&gt;
&lt;td&gt;Octubre 2023&lt;/td&gt;
&lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
<h2>Imágenes que Capturan la Actualidad</h2>
<img alt="Avances en tecnología" src="imagen-tecnologia.jpg">
<img alt="Investigaciones en salud" src="imagen-salud.jpg">
<img alt="Protección del medio ambiente" src="imagen-medioambiente.jpg">
&lt;p class="p_2"&gt;Estos artículos y noticias están diseñados para mantenerte informado sobre los temas de interés que impactan tu vida y la de tu comunidad. Te invitamos a explorar nuestro sitio y descubrir la información más relevante y actualizada.&lt;/p&gt;`;
  
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