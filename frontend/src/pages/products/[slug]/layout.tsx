// frontend/app/products/layout.tsx

import './product.css';
import { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Productos - Mi Tienda',
  description: 'Explora nuestra amplia gama de productos de alta calidad.',
  keywords: 'productos, tienda en línea, comprar, características, ofertas',
  robots: 'index, follow',
};

const ProductsLayout: React.FC<ProductsLayoutProps> = ({ children }) => {
  return (
    <div className="product-layout">
      {children}
    </div>
  );
};

export default ProductsLayout;
