import { ChangeEvent, FC, useState } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

import locationIcon from 'assets/icons/location.png';
import stationIcon from 'assets/icons/station.png';
import fuelIcon from 'assets/icons/fuelLg.png';

import styles from './StationInfo.module.css';

const StationInfo: FC = () => {
    const { orderFuel, totalCost } = useAppSelector((state) => state.refuel);

    const [stationInfo, setStationInfo] = useState({
        stationName: '',
        location: '',
    });

    const onChangeStationInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStationInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className={styles.info}>
            <h2>Gas station</h2>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <img src={stationIcon} alt="station" />
                    <input
                        value={stationInfo.stationName}
                        name="stationName"
                        type="text"
                        placeholder="Station name"
                        onChange={onChangeStationInfo}
                    />
                </div>
                <div className={styles.input}>
                    <img src={locationIcon} alt="location" />
                    <input
                        value={stationInfo.location}
                        name="location"
                        type="text"
                        placeholder="Location"
                        onChange={onChangeStationInfo}
                    />
                </div>
            </div>
            {orderFuel.name ? (
                <div>
                    <h4>{orderFuel.name}</h4>
                    <b>${orderFuel.price}</b>
                </div>
            ) : (
                <div className={styles.fuelIcon}>
                    <img src={fuelIcon} alt="fuel" />
                    <p>Add refuel to the cart</p>
                </div>
            )}

            {totalCost && (
                <div>
                    <p>Total cost: </p>
                    <b>${totalCost}</b>
                </div>
            )}

            <button
                disabled={!orderFuel.name}
                className={
                    !!orderFuel.name
                        ? `${styles.activePay} ${styles.pay}`
                        : `${styles.disabledPay} ${styles.pay}`
                }
            >
                Pay
            </button>
        </div>
    );
};

export default StationInfo;
