import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { loadStripe, StripeError } from '@stripe/stripe-js';

import HomeContent from 'components/homeContent/HomeContent';
import Error from 'components/common/error/Error';

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

    const isAdmin = role === 'admin';

    const [error, setError] = useState<StripeError | null>(null);

    const onAddOrderFuel = (orderFuel: IOrderFuel) => {
        dispatch(addOrderFuel(orderFuel));
    };

    const onResetOrder = () => {
        dispatch(removeOrderFuel());
    };

    const onRefuel = async (refuelData: IRefuelData) => {
        const { payload } = await dispatch(fetchRefuel(refuelData));

        const stripe = await stripePromise;
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                sessionId: payload.sessionId,
            });
            if (error) {
                setError(error);
            }
            onResetOrder();
        }
    };

    if (error) {
        return <Error />;
    }

    return (
        <HomeContent
            isAuth={isAuth}
            isAdmin={isAdmin}
            onAddOrderFuel={onAddOrderFuel}
            onRefuel={onRefuel}
            onResetOrder={onResetOrder}
        />
    );
};

export default Home;
