
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Explorando la Diversidad de Temas de Interés en la Actualidad";
  const meta_description = "Explorando la Diversidad de Temas de Interés en la Actualidad - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "información, actualidad, artículos, temas de interés, noticias";
  const meta_robots = "index, follow";
  const body_content = "<h1 class=\"h1_3\">Explorando la Diversidad de Temas de Inter\u00e9s en la Actualidad</h1>\n<p class=\"p_5\">En un mundo en constante cambio, la necesidad de mantenerse informado sobre diversos temas de inter\u00e9s se vuelve fundamental. Este sitio web se dedica a ofrecer art\u00edculos y noticias que abarcan una amplia gama de t\u00f3picos, desde tecnolog\u00eda y salud hasta cultura y medio ambiente. Aqu\u00ed, los lectores pueden encontrar informaci\u00f3n actualizada y relevante que les permita estar al tanto de las \u00faltimas tendencias y desarrollos en diferentes \u00e1reas.</p>\n<h2>Art\u00edculos Destacados</h2>\n<ul class=\"ul_3\">\n<li class=\"li_4\"><a href=\"#\">La evoluci\u00f3n de la tecnolog\u00eda en el siglo XXI</a></li>\n<li class=\"li_1\"><a href=\"#\">Tendencias de salud y bienestar para 2023</a></li>\n<li class=\"li_4\"><a href=\"#\">Impacto del cambio clim\u00e1tico en la biodiversidad</a></li>\n<li class=\"li_5\"><a href=\"#\">Nuevas corrientes culturales en la era digital</a></li>\n</ul>\n<h2>Tabla de Temas de Inter\u00e9s</h2>\n<table class=\"table_5\">\n<thead>\n<tr>\n<th>Tema</th>\n<th>Descripci\u00f3n</th>\n<th>\u00daltima Actualizaci\u00f3n</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Tecnolog\u00eda</td>\n<td>Avances en inteligencia artificial y su impacto en la sociedad.</td>\n<td>Septiembre 2023</td>\n</tr>\n<tr>\n<td>Salud</td>\n<td>Investigaciones recientes sobre la nutrici\u00f3n y el bienestar.</td>\n<td>Octubre 2023</td>\n</tr>\n<tr>\n<td>Cultura</td>\n<td>Exploraci\u00f3n de las nuevas formas de arte en el contexto contempor\u00e1neo.</td>\n<td>Agosto 2023</td>\n</tr>\n<tr>\n<td>Medio Ambiente</td>\n<td>Iniciativas para la sostenibilidad y conservaci\u00f3n de recursos.</td>\n<td>Octubre 2023</td>\n</tr>\n</tbody>\n</table>\n<h2>Im\u00e1genes Relacionadas</h2>\n<img alt=\"Avances tecnol\u00f3gicos\" src=\"tecnologia.jpg\"/>\n<img alt=\"Bienestar y salud\" src=\"salud.jpg\"/>\n<img alt=\"Arte contempor\u00e1neo\" src=\"cultura.jpg\"/>\n<img alt=\"Conservaci\u00f3n del medio ambiente\" src=\"medioambiente.jpg\"/>\n<p class=\"p_5\">Mantente informado y no te pierdas nuestras actualizaciones diarias. La informaci\u00f3n es clave para comprender la actualidad y tomar decisiones informadas sobre los temas que m\u00e1s te interesan.</p>";
  
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