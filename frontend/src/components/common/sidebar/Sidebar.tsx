import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

import Menu from './menu/Menu';
import Profile from './profile/Profile';

import styles from './Sidebar.module.css';

const Sidebar: FC = () => {
    const { isAuth } = useAuth();
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_wrapper}>
                <Link to={'/'} className={styles.logo}>
                    G<span>A</span>S<span>I</span>K
                </Link>
                <Menu isAuth={isAuth} />
            </div>
            <Profile isAuth={isAuth} />
        </div>
    );
};

export default Sidebar;
