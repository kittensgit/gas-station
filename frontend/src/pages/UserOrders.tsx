import { FC, useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IUserOrder, IUserOrderData } from 'types/order';

import UserOrdersContent from 'components/userOrdersContent/UserOrdersContent';

import { fetchUserOrders, removeUserOrder } from '../redux/slices/orders';

const UserOrders: FC = () => {
    const { userId } = useAuth();
    const dispatch = useAppDispatch();

    const [isRemoveOrder, setIsRemoveOrder] = useState<boolean>(false);
    const [ordersList, setOrdersList] = useState<IUserOrder[]>([]);
    useEffect(() => {
        const getOrders = async () => {
            const { payload } = await dispatch(fetchUserOrders(userId));
            if (payload) {
                setOrdersList(payload);
            }
            setIsRemoveOrder(false);
        };
        getOrders();
    }, [dispatch, userId, isRemoveOrder]);

    const onRemoveUserOrder = async (orderId: IUserOrderData['orderId']) => {
        const { payload } = await dispatch(
            removeUserOrder({
                userId,
                orderId,
            })
        );
        if (payload) {
            setIsRemoveOrder(true);
        } else {
            alert('Failed to delete order');
        }
    };

    return (
        <UserOrdersContent
            onRemoveUserOrder={onRemoveUserOrder}
            orders={ordersList}
        />
    );
};

export default UserOrders;
