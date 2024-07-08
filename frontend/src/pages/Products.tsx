import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductsContent from 'components/productsContent/ProductsContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IOrderProduct, IProduct } from 'types/product';

import { fetchOrderProduct, fetchProducts } from '../redux/slices/products';

const Products: FC = () => {
    const { typeFilter } = useParams();
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
