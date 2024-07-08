import { ChangeEvent, FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IOrderProduct, IProduct } from 'types/product';

import foodIcon from 'assets/icons/meal.png';
import mainIcon from 'assets/icons/mainSm.png';
import dessertIcon from 'assets/icons/dessertSm.png';
import drinksIcon from 'assets/icons/drinksSm.png';

import Product from './product/Product';

import styles from './ProductsContent.module.css';

interface ProductsContentProps {
    isAuth: boolean;
    products: IProduct[];
    onAddOrderProduct: (product: IOrderProduct) => void;
}

const ProductsContent: FC<ProductsContentProps> = ({
    products,
    isAuth,
    onAddOrderProduct,
}) => {
    const [productQuantity, setProductQuantity] = useState(1);
    const [activeProduct, setActiveProduct] = useState<string | null>(null);

    const onChangeProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(parseInt(e.target.value, 10));
    };

    const toggleEdit = (name: string) => {
        setActiveProduct(name);
    };

    const handleAddOrderProduct = (product: IOrderProduct) => {
        onAddOrderProduct(product);
        setActiveProduct(null);
    };

    const { pathname } = useLocation();
    return (
        <div className={styles.wrapper}>
            <ul className={styles.links}>
                <Link to={'/products/all'}>
                    <li
                        className={
                            pathname === '/products/all' ? styles.active : ''
                        }
                    >
                        <img src={foodIcon} alt="food icon" /> All
                    </li>
                </Link>
                <Link to={'/products/main'}>
                    <li
                        className={
                            pathname === '/products/main' ? styles.active : ''
                        }
                    >
                        <img src={mainIcon} alt="main food icon" /> Main
                    </li>
                </Link>
                <Link to={'/products/dessert'}>
                    <li
                        className={
                            pathname === '/products/dessert'
                                ? styles.active
                                : ''
                        }
                    >
                        <img src={dessertIcon} alt="dessert icon" /> Dessert
                    </li>
                </Link>
                <Link to={'/products/drinks'}>
                    <li
                        className={
                            pathname === '/products/drinks' ? styles.active : ''
                        }
                    >
                        <img src={drinksIcon} alt="drinks icon" /> Drinks
                    </li>
                </Link>
            </ul>
            <div className={styles.products}>
                {products.map((product) => (
                    <Product
                        key={product._id}
                        product={product}
                        isAuth={isAuth}
                        productQuantity={productQuantity}
                        isEditActive={activeProduct === product.name}
                        toggleEdit={toggleEdit}
                        handleAddOrderProduct={handleAddOrderProduct}
                        onChangeProductQuantity={onChangeProductQuantity}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsContent;
