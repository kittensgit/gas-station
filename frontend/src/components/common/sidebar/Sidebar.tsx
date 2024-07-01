import { FC } from 'react';
import { Link } from 'react-router-dom';

import Menu from './menu/Menu';
import Profile from './profile/Profile';

import styles from './Sidebar.module.css';

const Sidebar: FC = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_wrapper}>
                <Link to={'/'} className={styles.logo}>
                    G<span>A</span>S<span>I</span>K
                </Link>
                <Menu isAuth={true} />
            </div>
            <Profile isAuth={true} />
        </div>
    );
};

export default Sidebar;
