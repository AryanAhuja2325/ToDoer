import axios from 'axios';
import './SignUp.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.rePass) {
            alert("Passwords do not match!");
            return;
        }

        const reqData = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        try {
            const response = await axios.post("http://localhost:8000/users/signup", reqData);

            if (response.status == 200) {
                console.log("Siggned up")
            }
            else {
                console.log("Sign up failed")
            }
        } catch (e) {
            console.log(e);
        }

        // navigate("/dashboard");
    };

    return (
        <div className='body'>
            <div className='form'>
                <form onSubmit={validate}>
                    <h1>Signup</h1>
                    <div className='container'>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' name="email" id='email' required />
                    </div>
                    <div className='container'>
                        <label htmlFor='uName'>Username: </label>
                        <input type='text' name="username" id='uName' required />
                    </div>
                    <div className='container'>
                        <label htmlFor='pass'>Password: </label>
                        <input type='password' name="password" id='pass' required />
                    </div>
                    <div className='container'>
                        <label htmlFor='rePass'>Re-enter Password: </label>
                        <input type='password' name="rePass" id='rePass' required />
                    </div>
                    <a href='/login'>Already have an account? Login</a>
                    <br />
                    <button className='btn' type='submit'>SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
