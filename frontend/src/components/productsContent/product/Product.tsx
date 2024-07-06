import { FC } from 'react';

import { IProduct } from 'types/product';

import mainIcon from 'assets/icons/mainLg.png';
import dessertIcon from 'assets/icons/dessertLg.png';
import drinksIcon from 'assets/icons/drinksLg.png';
import pointsIcon from 'assets/icons/points.png';

import styles from './Product.module.css';

interface ProductProps {
    product: IProduct;
}

const Product: FC<ProductProps> = ({ product }) => {
    return (
        <div className={styles.product}>
            <div
                className={styles.productIcon}
                style={{
                    backgroundColor:
                        product.type === 'main'
                            ? '#FFD770'
                            : product.type === 'dessert'
                            ? '#F1A4DC'
                            : '#2C4260',
                }}
            >
                <img
                    src={
                        product.type === 'main'
                            ? mainIcon
                            : product.type === 'dessert'
                            ? dessertIcon
                            : drinksIcon
                    }
                    alt="product icon"
                />
            </div>
            <h3 className={styles.title}>{product.name}</h3>
            <div className={styles.info}>
                <b>
                    {product.scoresCount}
                    <img src={pointsIcon} alt="points" />
                </b>
                <button>Order</button>
            </div>
        </div>
    );
};

export default Product;
