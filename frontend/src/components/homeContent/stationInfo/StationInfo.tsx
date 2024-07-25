import { ChangeEvent, FC, useState } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';
import { IRefuelData } from 'types/fuel';

import fuelLgIcon from 'assets/icons/fuelLg.png';

import Calculations from './calculations/Calculations';
import Inputs from './inputs/Inputs';
import Fuel from './fuel/Fuel';

import styles from './StationInfo.module.css';

interface StationInfoProps {
    onRefuel: (refuelData: IRefuelData) => void;
}

const StationInfo: FC<StationInfoProps> = ({ onRefuel }) => {
    const { orderFuel, totalCost } = useAppSelector((state) => state.refuel);

    const discount = totalCost * (orderFuel.discount / 100);

    const subTotal = +totalCost.toFixed(2);

    const total = +(subTotal - discount).toFixed(2);

    const costPerLiterWithDiscount =
        orderFuel.price - orderFuel.price * (orderFuel.discount / 100);

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

    const handleRefuel = async () => {
        onRefuel({
            ...stationInfo,
            cost: total,
            costPerLiter: orderFuel.discount
                ? costPerLiterWithDiscount
                : orderFuel.price,
            scores: orderFuel.scores,
            litersFilled: orderFuel.literQuantity,
            fuelName: orderFuel.name,
        });
    };

    return (
        <div className={styles.info}>
            <div className={styles.about}>
                <h2>Gas station</h2>
                <Inputs
                    location={stationInfo.location}
                    stationName={stationInfo.stationName}
                    onChangeStationInfo={onChangeStationInfo}
                />
            </div>
            {orderFuel.name ? (
                <Fuel orderFuel={orderFuel} />
            ) : (
                <div className={styles.fuelIcon}>
                    <img src={fuelLgIcon} alt="fuel lg" />
                    <p>Add refuel to the cart</p>
                </div>
            )}

            {subTotal && (
                <Calculations
                    discount={discount}
                    scores={orderFuel.scores}
                    subTotal={subTotal}
                />
            )}

            {total && (
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
