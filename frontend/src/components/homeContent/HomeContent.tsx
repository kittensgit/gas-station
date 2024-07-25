import { FC } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';
import { IOrderFuel, IRefuelData } from 'types/fuel';

import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

interface HomeContentProps {
    isAuth: boolean;
    onAddOrderFuel: (orderFuel: IOrderFuel) => void;
    onRefuel: (refuelData: IRefuelData) => void;
    onResetOrder: () => void;
}

const HomeContent: FC<HomeContentProps> = ({
    isAuth,
    onAddOrderFuel,
    onRefuel,
    onResetOrder,
}) => {
    const { orderFuel, totalCost } = useAppSelector((state) => state.refuel);

    const isAddFuel = !!orderFuel.name;

    return (
        <div className={styles.wrapper}>
            <FuelList
                isAuth={isAuth}
                isAddFuel={isAddFuel}
                onAddOrderFuel={onAddOrderFuel}
            />
            <StationInfo
                orderFuel={orderFuel}
                totalCost={totalCost}
                onRefuel={onRefuel}
                onResetOrder={onResetOrder}
            />
        </div>
    );
};

export default HomeContent;
