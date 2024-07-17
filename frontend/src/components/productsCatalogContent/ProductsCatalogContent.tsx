import { FC } from 'react';

import { IProduct } from 'types/product';

import Product from './product/Product';

import styles from './ProductsCatalogContent.module.css';

interface ProductsCatalogContentProps {
    products: IProduct[];
}

const ProductsCatalogContent: FC<ProductsCatalogContentProps> = ({
    products,
}) => {
    return (
        <ul className={styles.products}>
            {products.map((item) => (
                <Product key={item._id} product={item} />
            ))}
        </ul>
    );
};

export default ProductsCatalogContent;
