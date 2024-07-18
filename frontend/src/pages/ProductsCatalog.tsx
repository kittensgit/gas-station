import { FC, useEffect, useState } from 'react';

import ProductsCatalogContent from 'components/productsCatalogContent/ProductsCatalogContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IProduct } from 'types/product';

import {
    addProduct,
    deleteProduct,
    fetchProducts,
} from '../redux/slices/products';

const ProductsCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [productsList, setProductsList] = useState<IProduct[]>([]);
    const [isAdd, setIsAdd] = useState<boolean>();
    const [isRemove, setIsRemove] = useState<boolean>();

    useEffect(() => {
        const getProducts = async () => {
            const { payload } = await dispatch(fetchProducts('all'));
            if (payload) {
                setProductsList(payload);
            }
            setIsAdd(false);
            setIsRemove(false);
        };
        getProducts();
    }, [dispatch, isAdd, isRemove]);

    const onAddProduct = async (product: Omit<IProduct, '_id'>) => {
        const { payload } = await dispatch(addProduct(product));
        if (payload) {
            setIsAdd(true);
        }
    };

    const onRemoveProduct = async (productId: IProduct['_id']) => {
        const { payload } = await dispatch(deleteProduct(productId));
        if (payload) {
            setIsRemove(true);
        }
    };

    return (
        <ProductsCatalogContent
            products={productsList}
            onAddProduct={onAddProduct}
            onRemoveProduct={onRemoveProduct}
        />
    );
};

export default ProductsCatalog;
