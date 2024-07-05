import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import SignIn from 'components/signIn/SignIn';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { ISignInData } from 'types/auth';

import { fetchAuth } from '../redux/slices/auth';

const Login: FC = () => {
    const { isAuth } = useAuth();
    const dispatch = useAppDispatch();
    const signIn = async (values: ISignInData) => {
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            return alert('Failed to login');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };
    if (isAuth) {
        return <Navigate to={'/'} />;
    }
    return <SignIn signIn={signIn} />;
};

export default Login;
