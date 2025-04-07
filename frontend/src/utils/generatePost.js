import axios from 'axios';

/**
 * Obtiene los últimos hasta 5 posts del backend.
 */
export const getLastPosts = async () => {
  try {
    const response = await axios.get('http://localhost:8001/get-all-posts/');
    const allPosts = response.data.posts;

    return allPosts.slice(-5).map(post => ({
      title: post.title,
      content: post.body_content,
    }));
  } catch (error) {
    console.error('Error al obtener los últimos posts:', error);
    return [];
  }
};

/**
 * Genera un nuevo post enviando los últimos hasta 5 posts al backend.
 */
export const generateNewPost = async () => {
    try {
      const response = await axios.post('http://localhost:8001/generate-post/');
      const newPost = response.data.post;
      console.log('Nuevo post generado:', newPost);
  
      return { slug: newPost.slug, fileContent: newPost.body_content };
    } catch (error) {
      console.error('Error al generar el nuevo post:', error);
      throw error;
    }
  };
