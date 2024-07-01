import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Profile.module.css';

interface ProfileProps {
    isAuth: boolean;
}

const Profile: FC<ProfileProps> = ({ isAuth }) => {
    const { pathname } = useLocation();
    return (
        <div className={styles.wrapper}>
            {isAuth ? (
                <>
                    <h3>Profile</h3>
                    <div className={styles.profile}>
                        <img className={styles.ava} alt="ava" />
                        <div className={styles.info}>
                            <h2>Antony Wonko</h2>
                            <p>1300 points</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.profileSwitch}>
                    <Link
                        className={
                            pathname === '/login'
                                ? `${styles.active} ${styles.link}`
                                : styles.link
                        }
                        to={'/login'}
                    >
                        Sign In
                    </Link>
                    <Link
                        className={
                            pathname === '/register'
                                ? `${styles.active} ${styles.link}`
                                : styles.link
                        }
                        to={'/register'}
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Profile;
