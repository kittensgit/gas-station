import { FC, useState } from 'react';

import { IProduct } from 'types/product';

import plusIcon from 'assets/icons/plus.png';
import addIcon from 'assets/icons/add_mark.png';

import Product from './product/Product';

import styles from './ProductsCatalogContent.module.css';

interface ProductsCatalogContentProps {
    products: IProduct[];
}

const ProductsCatalogContent: FC<ProductsCatalogContentProps> = ({
    products,
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [type, setType] = useState<IProduct['type']>('main');

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const toggleType = (type: IProduct['type']) => {
        setType(type);
    };

    const handleAddProduct = () => {
        toggleEdit();
        setType('main');
    };

    return (
        <ul className={styles.products}>
            <li className={styles.add_product}>
                {isEdit ? (
                    <div className={styles.edit}>
                        <div className={styles.inputs}>
                            <input
                                className={styles.name}
                                type="text"
                                placeholder="Name"
                            />
                            <input
                                className={styles.cost}
                                type="number"
                                placeholder="Price"
                            />
                        </div>
                        <div className={styles.edit_info}>
                            <ul className={styles.type}>
                                <li
                                    onClick={() => toggleType('main')}
                                    className={
                                        type === 'main' ? styles.active : ''
                                    }
                                >
                                    Main
                                </li>
                                <li
                                    onClick={() => toggleType('dessert')}
                                    className={
                                        type === 'dessert' ? styles.active : ''
                                    }
                                >
                                    Dessert
                                </li>
                                <li
                                    onClick={() => toggleType('drinks')}
                                    className={
                                        type === 'drinks' ? styles.active : ''
                                    }
                                >
                                    Drinks
                                </li>
                            </ul>
                            <button
                                onClick={handleAddProduct}
                                className={styles.edit_add}
                            >
                                <img src={addIcon} alt="checkmark" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={toggleEdit} className={styles.add}>
                        <img src={plusIcon} alt="plus" />
                    </button>
                )}
            </li>
            {products.map((item) => (
                <Product key={item._id} product={item} />
            ))}
        </ul>
    );
};

export default ProductsCatalogContent;
