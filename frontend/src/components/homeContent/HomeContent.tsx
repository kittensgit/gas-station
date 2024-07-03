import { FC } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { IOrderFuel } from 'types/fuel';

import { addOrderFuel } from '../../redux/slices/refuel';

import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

const HomeContent: FC = () => {
    const dispatch = useAppDispatch();

    const onAddOrderFuel = (orderFuel: IOrderFuel) => {
        dispatch(addOrderFuel(orderFuel));
    };
    return (
        <div className={styles.wrapper}>
            <FuelList onAddOrderFuel={onAddOrderFuel} />
            <StationInfo />
        </div>
    );
};

export default HomeContent;
