import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/../../types';
import Header from '@/components/Header/Header';
import PostDetails from '@/components/PostDetails/PostDetails';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src', 'posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  const post: Post = {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    content,
  };

  return (
    <>
      <Header
        introduccion={post.description}
        caracteristicas={post.content.split('\n').filter(line => line.startsWith('- '))}
        globalFotos={[]} // Añade URLs de imágenes si es necesario
        marcaPadre={post.title}
      />
      <PostDetails content={post.content} />
    </>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map(filename => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src', 'posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: 'Post no encontrado',
      description: 'El post que estás buscando no existe.',
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContents);

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    robots: 'index, follow',
  };
}
