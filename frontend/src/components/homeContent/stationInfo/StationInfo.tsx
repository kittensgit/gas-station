import { FC } from 'react';

import locationIcon from 'assets/icons/location.png';
import stationIcon from 'assets/icons/station.png';
import fuelIcon from 'assets/icons/fuelLg.png';

import styles from './Station.module.css';

const StationInfo: FC = () => {
    return (
        <div className={styles.info}>
            <h2>Gas station</h2>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <img src={stationIcon} alt="station" />
                    <input placeholder="Station name" />
                </div>
                <div className={styles.input}>
                    <img src={locationIcon} alt="location" />
                    <input placeholder="Location" />
                </div>
            </div>
            <div className={styles.fuel}>
                <img src={fuelIcon} alt="fuel" />
                <p>Add refuel to the cart</p>
            </div>
            <button disabled className={styles.disabledPay}>
                Pay
            </button>
        </div>
    );
};

export default StationInfo;
