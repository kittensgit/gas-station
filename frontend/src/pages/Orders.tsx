import { FC, useEffect } from 'react';

import OrdersContent from 'components/ordersContent/OrdersContent';
import Loading from 'components/common/loading/Loading';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IOrder } from 'types/order';

import { fetchAllOrders } from '../redux/slices/orders';

const Orders: FC = () => {
    const dispatch = useAppDispatch();

    const { orders, status } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <div>Error</div>;
    }

    return <OrdersContent orders={orders as IOrder[]} />;
};

export default Orders;
