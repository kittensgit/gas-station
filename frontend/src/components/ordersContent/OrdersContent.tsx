import { FC } from 'react';

import { IOrder } from 'types/order';

import Order from './order/Order';

import styles from './OrdersContent.module.css';

interface OrdersContentProps {
    orders: IOrder[];
}

const OrdersContent: FC<OrdersContentProps> = ({ orders }) => {
    return (
        <div className={styles.orders}>
            {orders.map((item) => (
                <Order key={item._id} order={item} />
            ))}
        </div>
    );
};

export default OrdersContent;
