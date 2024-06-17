import React from 'react';
import './Splash.css';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
    const navigation = useNavigate();

    const handleLogin = () => {
        navigation('/login');
    };

    const handleSignup = () => {
        navigation('/signup');
    };

    return (
        <div className='body'>
            <nav>
                <h3>To-Doer</h3>
                <div>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleSignup}>SignUp</button>
                </div>
            </nav>
            <div className="main-content">
                <h1>Welcome to To-Doer</h1>
                <p>
                    To-Doer is a revolutionary app that helps you manage your tasks efficiently.
                    Stay organized and improve your productivity with our intuitive interface and powerful features.
                </p>
            </div>
        </div>
    );
}

export default Splash;
