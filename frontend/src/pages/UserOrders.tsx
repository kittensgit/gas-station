import { FC, useEffect, useState } from 'react';

import UserOrdersContent from 'components/userOrdersContent/UserOrdersContent';
import Loading from 'components/common/loading/Loading';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IUserOrder, IUserOrderData } from 'types/order';

import { fetchUserOrders, removeUserOrder } from '../redux/slices/orders';

const UserOrders: FC = () => {
    const dispatch = useAppDispatch();

    const { userId } = useAuth();

    const { orders, status } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders(userId));
    }, [dispatch, userId]);

    const onRemoveUserOrder = (orderId: IUserOrderData['orderId']) => {
        dispatch(
            removeUserOrder({
                userId,
                orderId,
            })
        );
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'error') {
        return <div>Error</div>;
    }

    return (
        <UserOrdersContent
            orders={orders as IUserOrder[]}
            onRemoveUserOrder={onRemoveUserOrder}
        />
    );
};

export default UserOrders;
