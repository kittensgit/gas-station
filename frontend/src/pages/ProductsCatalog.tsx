import { FC, useEffect, useState } from 'react';

import ProductsCatalogContent from 'components/productsCatalogContent/ProductsCatalogContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IProduct } from 'types/product';

import { fetchProducts } from '../redux/slices/products';

const ProductsCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [productsList, setProductsList] = useState<IProduct[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const { payload } = await dispatch(fetchProducts('all'));
            if (payload) {
                setProductsList(payload);
            }
        };
        getProducts();
    }, [dispatch]);

    return <ProductsCatalogContent products={productsList} />;
};

export default ProductsCatalog;
