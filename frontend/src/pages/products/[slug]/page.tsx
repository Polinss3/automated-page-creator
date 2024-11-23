// frontend/app/products/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import { Product } from '@/../types';
import Image from 'next/image';
import ProductDetails from '../../../app/components/ProductDetails/ProductDetails';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ product }: { product: Product | null }) {
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return <ProductDetails product={product} />;
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'frontend', 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const filePath = path.join(process.cwd(), 'frontend', 'data', 'products.json');
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

export async function generateStaticProps({ params }: ProductPageProps) {
  const filePath = path.join(process.cwd(), 'frontend', 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  const product = products.find((p) => p.slug === params.slug) || null;

  return {
    props: {
      product,
    },
  };
}
