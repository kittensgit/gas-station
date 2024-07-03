import { ChangeEvent, FC, useState } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

import locationIcon from 'assets/icons/location.png';
import stationIcon from 'assets/icons/station.png';
import fuelIcon from 'assets/icons/fuelLg.png';

import styles from './StationInfo.module.css';

const StationInfo: FC = () => {
    const { orderFuel, totalCost } = useAppSelector((state) => state.refuel);
    console.log({
        ...orderFuel,
        totalCost,
    });

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
            <div className={styles.fuel}>
                <img src={fuelIcon} alt="fuel" />
                <p>Add refuel to the cart</p>
            </div>
            <button className={styles.disabledPay}>Pay</button>
        </div>
    );
};

export default StationInfo;
