// frontend/src/app/products/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import { Product } from '@/../../types';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import Header from '@/components/Header/Header'; // Importación del componente Header
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'data', 'products.json'); // Asegúrate de que esta ruta es correcta según tu estructura de directorios

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Leer y parsear el archivo JSON
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  // Encontrar el producto correspondiente al slug
  const product = products.find((p) => p.slug === slug);

  // Si no se encuentra el producto, mostrar página 404
  if (!product) {
    notFound();
  }

  // Integrar el componente Header con los datos del producto
  return (
    <>
      <Header
        introduccion={product.description}
        caracteristicas={product.features}
        globalFotos={[product.main_image]} // Usar la imagen principal del producto
        marcaPadre={product.name} // Usar el nombre del producto como título
        // Puedes añadir más props si es necesario
      />
      <ProductDetails product={product} />
    </>
  );
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'products.json'); // Asegúrate de que esta ruta es correcta
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(props: ProductPageProps) {
  const { params } = props; // Desestructurar params dentro de la función
  const filePath = path.join(process.cwd(), 'data', 'products.json'); // Asegúrate de que esta ruta es correcta
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que estás buscando no existe.',
    };
  }

  return {
    title: product.name,
    description: product.description,
    keywords: product.features.join(', '),
    robots: 'index, follow',
  };
}
