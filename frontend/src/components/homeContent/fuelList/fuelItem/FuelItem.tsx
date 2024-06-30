import { FC } from 'react';

import { IFuel } from 'types/fuel';

import styles from './FuelItem.module.css';

interface FuelItemProps {
    fuel: IFuel;
}

const FuelItem: FC<FuelItemProps> = ({ fuel }) => {
    return (
        <div className={styles.fuel}>
            <div
                className={styles.fuelIcon}
                style={{ backgroundColor: fuel.color }}
            >
                <span>{fuel.logo}</span>
            </div>
            <h3 className={styles.title}>{fuel.name}</h3>
            <div className={styles.price}>
                <p>${fuel.price}</p>
                <button>+</button>
            </div>
        </div>
    );
};

export default FuelItem;
