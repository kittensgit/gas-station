import { FC, useEffect } from 'react';

import UserOrdersContent from 'components/userOrdersContent/UserOrdersContent';
import Loading from 'components/common/loading/Loading';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IUserOrderData } from 'types/order';

import { fetchUserOrders, removeUserOrder } from '../redux/slices/userOrders';

const UserOrders: FC = () => {
    const dispatch = useAppDispatch();

    const { userId } = useAuth();

    const { orders, status } = useAppSelector((state) => state.userOrders);

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
            orders={orders}
            onRemoveUserOrder={onRemoveUserOrder}
        />
    );
};

export default UserOrders;
