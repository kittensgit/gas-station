import { FC } from 'react';

import { IShower } from 'types/shower';

import showerIcon from 'assets/icons/showerLg.png';

import styles from './Shower.module.css';

interface ShowerProps {
    shower: IShower;
    showerNum: number;
}

const Shower: FC<ShowerProps> = ({ shower, showerNum }) => {
    const showerStatus = shower.occupied.user;

    return (
        <li className={styles.shower}>
            <img src={showerIcon} alt="shower" />
            <div className={styles.shower_info}>
                <h4>
                    Shower <span>#{showerNum}</span>
                </h4>
                <p className={styles.status}>
                    Status:
                    <span
                        className={showerStatus ? styles.occupied : styles.free}
                    >
                        {showerStatus ? 'Occupied' : 'Free'}
                    </span>
                </p>
            </div>
        </li>
    );
};

export default Shower;
