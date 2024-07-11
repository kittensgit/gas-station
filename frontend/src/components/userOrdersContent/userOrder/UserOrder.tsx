import { FC } from 'react';

import { IUserOrder, IUserOrderData } from 'types/order';
import { formatOrderDate } from 'helpers';

import pointsIcon from 'assets/icons/points.png';
import cartIcon from 'assets/icons/cart.png';
import parcelIcon from 'assets/icons/parcel.png';
import addIcon from 'assets/icons/add1.png';

import styles from './UserOrder.module.css';

interface UserOrderProps {
    order: IUserOrder;
    onRemoveUserOrder: (orderId: IUserOrderData['orderId']) => void;
}

const UserOrder: FC<UserOrderProps> = ({ order, onRemoveUserOrder }) => {
    const { orderDate, product, quantity, statusReady, totalScores, _id } =
        order;
    return (
        <li className={styles.order}>
            <div
                className={statusReady ? styles.parcel_icon : styles.cart_icon}
            >
                {statusReady && (
                    <button
                        onClick={() => onRemoveUserOrder(_id)}
                        className={styles.tooltip}
                    >
                        <p>I received the order</p>
                        <img src={addIcon} alt="add" />
                    </button>
                )}
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
        </li>
    );
};

export default UserOrder;
