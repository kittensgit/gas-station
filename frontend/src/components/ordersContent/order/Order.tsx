import { FC } from 'react';

import { IOrder } from 'types/order';
import { formatOrderDate } from 'helpers';

import pointsIcon from 'assets/icons/points.png';

import styles from './Order.module.css';

interface OrderProps {
    order: IOrder;
}

const Order: FC<OrderProps> = ({ order }) => {
    return (
        <div className={styles.order}>
            <div className={styles.order_top}>
                <p>{order.user.fullName}</p>
            </div>
            <ul className={styles.order_list}>
                {order.orders.map((item) => {
                    const {
                        product,
                        quantity,
                        totalScores,
                        orderDate,
                        statusReady,
                        _id,
                    } = item;
                    return (
                        <li className={styles.order_item} key={_id}>
                            <p>{product.name}</p>
                            <p className={styles.quantity}>×{quantity}</p>
                            <div className={styles.price}>
                                <p>{totalScores}</p>
                                <img src={pointsIcon} alt="points" />
                            </div>
                            <p className={styles.date}>
                                {formatOrderDate(orderDate)}
                            </p>
                            <div className={styles.status}>
                                <div
                                    className={
                                        statusReady
                                            ? styles.green_circle
                                            : styles.yellow_circle
                                    }
                                ></div>
                                <p>{statusReady ? 'Ready' : 'Preparing'}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Order;
