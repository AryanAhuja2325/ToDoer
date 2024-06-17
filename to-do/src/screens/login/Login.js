import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            const reqData = Object.fromEntries(formData.entries());
            console.log(reqData)
            const response = await axios.post("http://localhost:8000/users/login", reqData);
            if (!response.status == 200) {
                throw new Error('Login failed');
            }
            const data = response.data;
            console.log(data)
            navigate("/dashboard")
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className='body'>
            <div className='form'>
                <form onSubmit={validate}>
                    <h1>Login</h1>
                    <div className='container'>
                        <label htmlFor='uName'>Username: </label>
                        <input type='text' name="username" id='uName' required />
                    </div>
                    <div className='container'>
                        <label htmlFor='pass'>Password: </label>
                        <input type='password' name="password" id='pass' required />
                    </div>
                    <a href='/signup'>Don't have an account? Sign Up</a>
                    <br />
                    <br />
                    <button className='btn' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
