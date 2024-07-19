import { FC, useEffect, useState } from 'react';

import ProductsCatalogContent from 'components/productsCatalogContent/ProductsCatalogContent';
import Loading from 'components/common/loading/Loading';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IProduct } from 'types/product';

import {
    addProduct,
    deleteProduct,
    fetchProducts,
} from '../redux/slices/products';

const ProductsCatalog: FC = () => {
    const dispatch = useAppDispatch();

    const [isAdd, setIsAdd] = useState<boolean>();
    const [isRemove, setIsRemove] = useState<boolean>();

    const { products, status } = useAppSelector((state) => state.products);

    useEffect(() => {
        const getProducts = async () => {
            dispatch(fetchProducts('all'));
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

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <ProductsCatalogContent
            products={products}
            onAddProduct={onAddProduct}
            onRemoveProduct={onRemoveProduct}
        />
    );
};

export default ProductsCatalog;
