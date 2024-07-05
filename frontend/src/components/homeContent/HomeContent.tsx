import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IOrderFuel, IRefuelData } from 'types/fuel';

import {
    addOrderFuel,
    fetchRefuel,
    removeOrderFuel,
} from '../../redux/slices/refuel';

import FuelList from './fuelList/FuelList';
import StationInfo from './stationInfo/StationInfo';

import styles from './HomeContent.module.css';

const HomeContent: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuth } = useAuth();

    const onAddOrderFuel = (orderFuel: IOrderFuel) => {
        dispatch(addOrderFuel(orderFuel));
    };

    const onRefuel = async (refuelData: IRefuelData) => {
        const data = await dispatch(fetchRefuel(refuelData));
        if (data.payload) {
            navigate('/refuelHistory');
            dispatch(removeOrderFuel());
        } else {
            alert('Failed to refuel');
        }
    };

    return (
        <div className={styles.wrapper}>
            <FuelList isAuth={isAuth} onAddOrderFuel={onAddOrderFuel} />
            <StationInfo onRefuel={onRefuel} />
        </div>
    );
};

export default HomeContent;
