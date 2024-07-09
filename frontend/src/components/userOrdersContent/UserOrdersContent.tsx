import { FC } from 'react';
import { IUserOrder } from 'types/order';

import UserOrder from './userOrder/UserOrder';

import styles from './UserOrdersContent.module.css';

interface UserOrdersContentProps {
    orders: IUserOrder[];
}

const UserOrdersContent: FC<UserOrdersContentProps> = ({ orders }) => {
    return (
        <div className={styles.orders}>
            {orders.map((item) => (
                <UserOrder key={item._id} order={item} />
            ))}
        </div>
    );
};

export default UserOrdersContent;
