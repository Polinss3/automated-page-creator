// templates/post_template.tsx

import React from 'react';
import Header from '../../components/Header/Header';
import PostDetails from '../../components/PostDetails/PostDetails';

interface PostPageProps {
  title: string;
  meta_description: string;
  meta_keywords: string;
  meta_robots: string;
  body_content: string;
}

const PostPage: React.FC<PostPageProps> = ({ title, meta_description, meta_keywords, meta_robots, body_content }) => {
  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keywords} />
        <meta name="robots" content={meta_robots} />
      </head>
      <Header
        introduccion={meta_description}
        caracteristicas={[]} // Puedes pasar las características si las tienes
        globalFotos={[/* URLs de imágenes si las tienes */]}
        marcaPadre={title}
      />
      <PostDetails content={body_content} />
    </>
  );
};

export default PostPage;
