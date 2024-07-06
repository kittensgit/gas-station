import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductsContent from 'components/productsContent/ProductsContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IProduct } from 'types/product';

import { fetchProducts } from '../redux/slices/products';

const Products: FC = () => {
    const dispatch = useAppDispatch();
    const { typeFilter } = useParams();
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const { payload } = await dispatch(fetchProducts(typeFilter!));
            if (payload) {
                setProducts(payload);
            } else {
                alert('Failed to get products');
            }
        };
        getProducts();
    }, [dispatch, typeFilter]);

    return <ProductsContent products={products} />;
};

export default Products;
