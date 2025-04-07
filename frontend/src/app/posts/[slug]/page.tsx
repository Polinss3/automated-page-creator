'use client'; // Marca este componente como cliente para permitir interactividad

import React from 'react';
import { generateNewPost } from '@/../utils/generatePost';

const PostPage = () => {
  const handleGeneratePost = async () => {
    try {
      const { slug, fileContent } = await generateNewPost();
      console.log(`Post generado con slug: ${slug}`);
    } catch (error) {
      console.error('Error al generar el post:', error);
    }
  };

  return (
    <div>
      <h1>Generador de Posts</h1>
      <button
        onClick={handleGeneratePost}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generar Nuevo Post
      </button>
    </div>
  );
};

export default PostPage;
