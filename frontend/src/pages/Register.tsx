import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import SignUp from 'components/signUp/SignUp';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';

import { ISignUpData } from 'types/auth';

import { fetchRegister } from '../redux/slices/auth';

const Register: FC = () => {
    const { isAuth } = useAuth();
    const dispatch = useAppDispatch();

    const signUp = async (values: ISignUpData) => {
        await dispatch(fetchRegister(values));
    };

    if (isAuth) {
        return <Navigate to={'/'} />;
    }
    return <SignUp signUp={signUp} />;
};

export default Register;
