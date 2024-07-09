import { FC } from 'react';

import { IUserOrder } from 'types/order';
import { formatOrderDate } from 'helpers';

import pointsIcon from 'assets/icons/points.png';
import cartIcon from 'assets/icons/cart.png';
import parcelIcon from 'assets/icons/parcel.png';

import styles from './UserOrder.module.css';

interface UserOrderProps {
    order: IUserOrder;
}

const UserOrder: FC<UserOrderProps> = ({ order }) => {
    const { orderDate, product, quantity, statusReady, totalScores } = order;
    return (
        <div className={styles.order}>
            <div
                className={statusReady ? styles.parcel_icon : styles.cart_icon}
            >
                <img src={statusReady ? parcelIcon : cartIcon} alt="order" />
            </div>
            <div className={styles.order_content}>
                <h4>{product.name}</h4>
                <p>×{quantity}</p>
                <div className={styles.price}>
                    <b>{totalScores}</b>
                    <img src={pointsIcon} alt="points" />
                </div>
                <p>{formatOrderDate(orderDate)}</p>
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
            </div>
        </div>
    );
};

export default UserOrder;
