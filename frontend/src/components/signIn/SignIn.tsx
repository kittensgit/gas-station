import { FC } from 'react';
import { Link } from 'react-router-dom';

import emailIcon from 'assets/icons/email.png';
import passwordIcon from 'assets/icons/password.png';

import styles from './SignIn.module.css';

const SignIn: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.introducing}>
                <h1>Welcome Back!</h1>
                <p>
                    To keep connection with us. Please enter your personal info
                </p>
                <Link to={'/register'}>
                    <button className={styles.btn}>Sign Up</button>
                </Link>
            </div>
            <div className={styles.signin}>
                <h2>Log In</h2>
                <div className={styles.inputs}>
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
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignIn;
