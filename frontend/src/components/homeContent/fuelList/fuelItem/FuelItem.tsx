import { ChangeEvent, FC, useState } from 'react';

import { IFuel, IOrderFuel } from 'types/fuel';

import addIcon from 'assets/icons/add.png';

import styles from './FuelItem.module.css';

interface FuelItemProps {
    fuel: IFuel;
    literQuantity: number;
    onChangeLiterQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddOrderFuel: (orderfuel: IOrderFuel) => void;
}

const FuelItem: FC<FuelItemProps> = ({
    fuel,
    literQuantity,
    onChangeLiterQuantity,
    onAddOrderFuel,
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const toggleEdit = () => setIsEdit(!isEdit);

    const { color, logo, name, price } = fuel;

    const addOrderFuel = () => {
        const newOrderFuel: IOrderFuel = {
            color,
            name,
            price,
            literQuantity,
        };
        onAddOrderFuel(newOrderFuel);
        toggleEdit();
    };

    return (
        <div className={styles.fuel}>
            <div className={styles.fuelIcon} style={{ backgroundColor: color }}>
                <span>{logo}</span>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.price}>
                <p>${price}</p>
                {isEdit ? (
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
                    <button onClick={toggleEdit} className={styles.btn}>
                        +
                    </button>
                )}
            </div>
        </div>
    );
};

export default FuelItem;
