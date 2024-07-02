import { FC, useState } from 'react';

import { IFuel } from 'types/fuel';

import addIcon from 'assets/icons/add.png';

import styles from './FuelItem.module.css';

interface FuelItemProps {
    fuel: IFuel;
}

const FuelItem: FC<FuelItemProps> = ({ fuel }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const toggleEdit = () => setIsEdit(!isEdit);

    const { color, logo, name, price } = fuel;
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
                        <input type="number" placeholder="0" />
                        <button onClick={toggleEdit}>
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
