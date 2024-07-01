import { FC } from 'react';

import styles from './Profile.module.css';

const Profile: FC = () => {
    return (
        <div className={styles.wrapper}>
            <h3>Profile</h3>
            <div className={styles.profile}>
                <img className={styles.ava} alt="ava" />
                <div className={styles.info}>
                    <h2>Antony Wonko</h2>
                    <p>1300 points</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
