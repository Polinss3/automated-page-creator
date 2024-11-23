// frontend/types.ts

export interface Product {
  name: string;
  slug: string;
  price: string;
  main_image: string;
  secondary_image: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface Post {
  title: string;
  description: string;
  keywords: string;
  content: string;
}
