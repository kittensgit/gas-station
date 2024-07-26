import { ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IFuel, IOrderFuel } from 'types/fuel';

import addIcon from 'assets/icons/add.png';

import styles from './FuelItem.module.css';

interface FuelItemProps {
    fuel: IFuel;
    literQuantity: number;
    isEditActive: boolean;
    isAddFuel: boolean;
    isAuth: boolean;
    isAdmin: boolean;
    onChangeLiterQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddOrderFuel: (fuel: IOrderFuel) => void;
    toggleEdit: (name: string) => void;
}

const FuelItem: FC<FuelItemProps> = ({
    fuel,
    literQuantity,
    isEditActive,
    isAddFuel,
    isAuth,
    isAdmin,
    onChangeLiterQuantity,
    onAddOrderFuel,
    toggleEdit,
}) => {
    const navigate = useNavigate();
    const { color, logo, name, price, discount, scores } = fuel;

    const addOrderFuel = () => {
        const newOrderFuel: IOrderFuel = {
            color,
            name,
            price,
            literQuantity,
            discount,
            scores,
        };
        onAddOrderFuel(newOrderFuel);
    };

    const handleEdit = () => {
        if (isAuth) {
            toggleEdit(name);
        } else {
            navigate('/login');
        }
    };

    return (
        <li className={styles.fuel}>
            {discount !== 0 && (
                <div className={styles.discount}>
                    <div className={styles.discount_procent}>
                        <span>-{discount}%</span>
                    </div>
                </div>
            )}
            <div className={styles.fuelIcon} style={{ backgroundColor: color }}>
                <span>{logo}</span>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.price}>
                <p>${price}</p>
                {isAdmin ? (
                    <p>40*</p>
                ) : isEditActive ? (
                    <div className={styles.edit}>
                        <p>L:</p>
                        <input
                            value={literQuantity}
                            type="number"
                            placeholder="0"
                            name={name}
                            onChange={onChangeLiterQuantity}
                        />
                        <button onClick={addOrderFuel}>
                            <img src={addIcon} alt="add" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleEdit}
                        className={styles.btn}
                        disabled={isAddFuel}
                    >
                        +
                    </button>
                )}
            </div>
        </li>
    );
};

export default FuelItem;
