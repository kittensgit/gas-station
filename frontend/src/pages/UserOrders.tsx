import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IUserOrder } from 'types/order';

import UserOrdersContent from 'components/userOrdersContent/UserOrdersContent';

import { fetchUserOrders } from '../redux/slices/orders';

const UserOrders: FC = () => {
    const { userId, isAuth } = useAuth();
    const dispatch = useAppDispatch();

    const [ordersList, setOrdersList] = useState<IUserOrder[]>([]);
    useEffect(() => {
        const getOrders = async () => {
            const { payload } = await dispatch(fetchUserOrders(userId));
            if (payload) {
                setOrdersList(payload);
            }
        };
        getOrders();
    }, [dispatch, userId]);

    if (!isAuth) {
        return <Navigate to={'/login'} />;
    }

    return <UserOrdersContent orders={ordersList} />;
};

export default UserOrders;
