import { FC } from 'react';
import { IUserOrder, IUserOrderData } from 'types/order';

import UserOrder from './userOrder/UserOrder';

import styles from './UserOrdersContent.module.css';

interface UserOrdersContentProps {
    orders: IUserOrder[];
    onRemoveUserOrder: (orderId: IUserOrderData['orderId']) => void;
}

const UserOrdersContent: FC<UserOrdersContentProps> = ({
    orders,
    onRemoveUserOrder,
}) => {
    return (
        <div className={styles.orders}>
            {orders.map((item) => (
                <UserOrder
                    key={item._id}
                    order={item}
                    onRemoveUserOrder={onRemoveUserOrder}
                />
            ))}
        </div>
    );
};

export default UserOrdersContent;
