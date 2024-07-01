import { FC } from 'react';
import { Link } from 'react-router-dom';

import userIcon from 'assets/icons/user.png';
import emailIcon from 'assets/icons/email.png';
import passwordIcon from 'assets/icons/password.png';

import styles from './SignUp.module.css';

const SignUp: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.introducing}>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <Link to={'/login'}>
                    <button className={styles.btn}>Sign In</button>
                </Link>
            </div>
            <div className={styles.signup}>
                <h2>Create Account</h2>
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <img src={userIcon} alt="username" />
                        <input placeholder="Name" />
                    </div>
                    <div className={styles.input}>
                        <img src={emailIcon} alt="email" />
                        <input placeholder="Email" />
                    </div>
                    <div className={styles.input}>
                        <img src={passwordIcon} alt="password" />
                        <input placeholder="Password" />
                    </div>
                </div>
                <button className={styles.btn + ' ' + styles.btnFilled}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
