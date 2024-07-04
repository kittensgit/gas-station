import { ChangeEvent, FC, useState } from 'react';

import { IFuel, IOrderFuel } from 'types/fuel';

import addIcon from 'assets/icons/add.png';

import styles from './FuelItem.module.css';

interface FuelItemProps {
    fuel: IFuel;
    literQuantity: number;
    isEditActive: boolean;
    isAddFuel: boolean;
    onChangeLiterQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddOrderFuel: (fuel: IOrderFuel) => void;
    toggleEdit: (name: string) => void;
}

const FuelItem: FC<FuelItemProps> = ({
    fuel,
    literQuantity,
    isEditActive,
    isAddFuel,
    onChangeLiterQuantity,
    onAddOrderFuel,
    toggleEdit,
}) => {
    const { color, logo, name, price, discount } = fuel;

    const addOrderFuel = () => {
        const newOrderFuel: IOrderFuel = {
            color,
            name,
            price,
            literQuantity,
            discount,
        };
        onAddOrderFuel(newOrderFuel);
    };

    return (
        <div className={styles.fuel}>
            {discount && (
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
                {isEditActive ? (
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
                        onClick={() => toggleEdit(name)}
                        className={styles.btn}
                        disabled={isAddFuel}
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
};

export default FuelItem;
