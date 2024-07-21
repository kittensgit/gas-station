import { FC } from 'react';

import { IOrderFuel, IRefuelData } from 'types/fuel';

import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

interface HomeContentProps {
    isAuth: boolean;
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
    onRefuel: (refuelData: IRefuelData) => void;
}

const HomeContent: FC<HomeContentProps> = ({
    isAuth,
    onAddOrderFuel,
    onRefuel,
}) => {
    return (
        <div className={styles.wrapper}>
            <FuelList isAuth={isAuth} onAddOrderFuel={onAddOrderFuel} />
            <StationInfo onRefuel={onRefuel} />
        </div>
    );
};

export default HomeContent;
