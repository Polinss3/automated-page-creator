
import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

const PostPage: React.FC = () => {
  const title = "Descubriendo lo actual: un vistazo a los temas de interés y noticias más recientes";
  const meta_description = "Descubriendo lo actual: un vistazo a los temas de interés y noticias más recientes - Este sitio web es sobre artículos y noticias relacionadas con diversos temas de interés.";
  const meta_keywords = "temas de interés, noticias, actualidad, artículos, información";
  const meta_robots = "index, follow";
  const body_content = `{{ body_content }}`;
  
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