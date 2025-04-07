import React from 'react';
import { generateNewPost } from '../utils/generatePost';

const Home = () => {
  const handleGeneratePost = async () => {
    try {
      const { slug, fileContent } = await generateNewPost();
      console.log(`Post generado con slug: ${slug}`);

      // Crear el archivo en el sistema de archivos local (si fuera necesario)
    } catch (error) {
      console.error('Error al generar el post:', error);
    }
  };

  return (
    <div>
      <h1>Generador de Posts</h1>
      <button onClick={handleGeneratePost}>Generar Nuevo Post</button>
    </div>
  );
};

export default Home;
