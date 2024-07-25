import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import HomeContent from 'components/homeContent/HomeContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IOrderFuel, IRefuelData } from 'types/fuel';

import {
    addOrderFuel,
    fetchRefuel,
    removeOrderFuel,
} from '../redux/slices/refuel';

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isAuth, role } = useAuth();

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

    if (role === 'admin') {
        return <Navigate to={'/users'} />;
    }

    return (
        <HomeContent
            isAuth={isAuth}
            onAddOrderFuel={onAddOrderFuel}
            onRefuel={onRefuel}
        />
    );
};

export default Home;
