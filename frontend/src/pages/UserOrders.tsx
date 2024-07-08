import { FC, useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { IUserOrder } from 'types/order';

import { fetchUserOrders } from '../redux/slices/orders';

const UserOrders: FC = () => {
    const { userId } = useAuth();
    const dispatch = useAppDispatch();

    const [ordersList, setOrdersList] = useState<IUserOrder[]>([]);
    useEffect(() => {
        const getOrders = async () => {
            const { payload } = await dispatch(fetchUserOrders(userId));
            console.log(payload);
            if (payload) {
                setOrdersList(payload);
            } else {
                alert('Failed get orders');
            }
        };
        getOrders();
    }, [dispatch, userId]);
    return (
        <div>
            {ordersList.map((item, index) => (
                <div key={index}>lol</div>
            ))}
        </div>
    );
};

export default UserOrders;
