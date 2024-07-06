import { ChangeEvent, FC, useState } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

import locationIcon from 'assets/icons/location.png';
import stationIcon from 'assets/icons/station.png';
import fuelLgIcon from 'assets/icons/fuelLg.png';
import fuelSmIcon from 'assets/icons/fuelSm.png';
import pointsIcon from 'assets/icons/points_green.png';

import { IRefuelData } from 'types/fuel';

import styles from './StationInfo.module.css';

interface StationInfoProps {
    onRefuel: (refuelData: IRefuelData) => void;
}

const StationInfo: FC<StationInfoProps> = ({ onRefuel }) => {
    const { orderFuel, totalCost } = useAppSelector((state) => state.refuel);

    const subTotal = totalCost && +totalCost.toFixed(2);

    const total =
        orderFuel.discount && subTotal
            ? +(subTotal - orderFuel.discount).toFixed(2)
            : subTotal;

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

    const handleRefuel = () => {
        onRefuel({
            ...stationInfo,
            cost: total!,
            scores: orderFuel.scores!,
            litersFilled: orderFuel.literQuantity!,
            fuelName: orderFuel.name,
        });
    };

    return (
        <div className={styles.info}>
            <div className={styles.about}>
                <h2>Gas station</h2>
                <div className={styles.inputs}></div>
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
                <div className={styles.fuel}>
                    <div className={styles.fuel_info}>
                        <div
                            className={styles.fuel_image}
                            style={{
                                backgroundColor: `${orderFuel.color}`,
                            }}
                        >
                            <img src={fuelSmIcon} alt="fuel sm" />
                        </div>
                        <div className={styles.fuel_about}>
                            <h4>{orderFuel.name}</h4>
                            <p>{orderFuel.literQuantity}L</p>
                        </div>
                    </div>
                    <b className={styles.fuel_price}>${orderFuel.price}</b>
                </div>
            ) : (
                <div className={styles.fuelIcon}>
                    <img src={fuelLgIcon} alt="fuel lg" />
                    <p>Add refuel to the cart</p>
                </div>
            )}

            {subTotal && (
                <div className={styles.calculations}>
                    <div className={styles.calc_item}>
                        <p>Subtotal</p>
                        <b>${subTotal}</b>
                    </div>
                    <div className={styles.calc_item}>
                        <p>Discount</p>
                        <b>
                            -${orderFuel.discount ? orderFuel.discount : '0.00'}
                        </b>
                    </div>
                    <div className={styles.calc_item}>
                        <p>Bonus(points)</p>
                        <b>
                            {orderFuel.scores}
                            <img src={pointsIcon} alt="points" />
                        </b>
                    </div>
                </div>
            )}

            {subTotal && (
                <div className={styles.totalCost}>
                    <p>Total cost: </p>
                    <b>${total}</b>
                </div>
            )}

            <button
                onClick={handleRefuel}
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
