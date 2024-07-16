import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IOrder } from 'types/order';

import OrdersContent from 'components/ordersContent/OrdersContent';

import { fetchAllOrders } from '../redux/slices/orders';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const [ordersList, setOrdersList] = useState<IOrder[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            const { payload } = await dispatch(fetchAllOrders());
            if (payload) {
                setOrdersList(payload);
            }
        };
        getOrders();
    }, [dispatch]);
    return <OrdersContent orders={ordersList} />;
};

export default Orders;
