import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductsContent from 'components/productsContent/ProductsContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IOrderProduct } from 'types/product';
import { useAppSelector } from 'hooks/useAppSelector';

import { fetchOrderProduct, fetchProducts } from '../redux/slices/products';

const Products: FC = () => {
    const { typeFilter } = useParams();
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { products } = useAppSelector((state) => state.products);

    useEffect(() => {
        const getProducts = async () => {
            if (typeFilter) {
                dispatch(fetchProducts(typeFilter));
            }
        };
        getProducts();
    }, [dispatch, typeFilter]);

    const onAddOrderProduct = async (product: IOrderProduct) => {
        const { payload } = await dispatch(fetchOrderProduct(product));
        if (!payload) {
            alert('Failed to order product');
        } else {
            navigate('/userOrders');
        }
    };

    return (
        <ProductsContent
            products={products}
            isAuth={isAuth}
            onAddOrderProduct={onAddOrderProduct}
        />
    );
};

export default Products;
