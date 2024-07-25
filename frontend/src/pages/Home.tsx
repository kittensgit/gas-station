import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import HomeContent from 'components/homeContent/HomeContent';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { IOrderFuel, IRefuelData } from 'types/fuel';

import {
    addOrderFuel,
    fetchRefuel,
    removeOrderFuel,
} from '../redux/slices/refuel';

const stripePromise = loadStripe(
    'pk_test_51PWYf402vF6hOY02eEkeJtxfl6OPpJO1DgWyQp4QQ7ZYINWvDVpipn8oL13i0NfK6gyALs0CjS6FXlYVoj9ayVeU00IiLd8XXR'
);

const Home: FC = () => {
    const dispatch = useAppDispatch();

    const { isAuth, role } = useAuth();

    const onAddOrderFuel = (orderFuel: IOrderFuel) => {
        dispatch(addOrderFuel(orderFuel));
    };

    const onRefuel = async (refuelData: IRefuelData) => {
        const { payload } = await dispatch(fetchRefuel(refuelData));

        const stripe = await stripePromise;
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                sessionId: payload.sessionId,
            });
            if (error) {
                console.error('Error:', error);
            }
            dispatch(removeOrderFuel());
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
