// frontend/components/ProductDetails.tsx

import { FC } from 'react';
import { Product } from '@/../../types';
import styles from './ProductDetails.module.css';
import Image from 'next/image';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className={styles.productContainer}>
      <h1 className={styles.title}>{product.name}</h1>
      <Image
        className={styles.mainImage}
        src={product.main_image}
        alt={`${product.name} imagen principal`}
        width={800}
        height={600}
      />
      <h2 className={styles.subtitle}>{product.subtitle}</h2>
      <p className={styles.description}>{product.description}</p>
      <Image
        className={styles.secondaryImage}
        src={product.secondary_image}
        alt={`${product.name} imagen secundaria`}
        width={800}
        height={600}
      />
      <ul className={styles.features}>
        {product.features.map((feature: any, index: any) => (
          <li key={index} className={styles.featureItem}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
