import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { logout } from '../../../redux/slices/auth';

import Menu from './menu/Menu';
import Profile from './profile/Profile';

import styles from './Sidebar.module.css';

const Sidebar: FC = () => {
    const { isAuth, fullName, scores } = useAuth();
    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch(logout());
        if (window.confirm('You really want to log out?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_wrapper}>
                <Link to={'/'} className={styles.logo}>
                    G<span>A</span>S<span>I</span>K
                </Link>
                <Menu isAuth={isAuth} />
            </div>
            <Profile
                isAuth={isAuth}
                fullName={fullName}
                scores={scores!}
                logOut={logOut}
            />
        </div>
    );
};

export default Sidebar;
