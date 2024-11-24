// frontend/src/app/posts/[slug]/page.tsx

import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';
import Head from 'next/head';

interface PostProps {
  title: string;
  meta_description: string;
  meta_keywords: string;
  meta_robots: string;
  body_content: string;
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Realizar la solicitud al back-end de FastAPI
  const res = await fetch(`http://localhost:8000/posts/${slug}/`, {
    // Opcional: Puedes configurar la caché según tus necesidades
    cache: 'no-store',
  });

  if (!res.ok) {
    // Manejar errores de la solicitud
    return (
      <div>
        <h1>Post no encontrado</h1>
        <p>El post con el slug "{slug}" no existe.</p>
      </div>
    );
  }

  const post: PostProps = await res.json();

  // Extraer características (caracteristicas) del contenido
  const caracteristicas = post.body_content.match(/<li>.*?<\/li>/g)?.map(li => li.replace(/<\/?li>/g, '')) || [];

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.meta_description} />
        <meta name="keywords" content={post.meta_keywords} />
        <meta name="robots" content={post.meta_robots} />
      </Head>
      <Header
        introduccion={post.meta_description}
        caracteristicas={caracteristicas}
        globalFotos={[] /* Añade URLs de imágenes si es necesario */}
        marcaPadre={post.title}
      />
      <PostDetails content={post.body_content} />
    </>
  );
};

export default PostPage;
