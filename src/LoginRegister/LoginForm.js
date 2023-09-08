import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationStore from '../utility/ApplicationStorage';
import './Style.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation here

        const store = ApplicationStore();
        store.setStorage('email', email); // Store the email in sessionStorage
        store.setStorage('password', password); // Store the password in sessionStorage

        const errors = []
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        const emailRegex =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


        if (!email.trim() || !password.trim()) {
            errors.push('Please fill all the fields');
        }

        if (!emailRegex.test(email)) {
            errors.push('Enter a valid email id');
        }

        if (!passwordRegex.test(password)) {
            errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one digit');
        }


        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (res.ok) {
                    window.alert('Login successful');
                    navigate('/dashboard');
                } else {
                    window.alert('Login failed');
                }
            })
            .catch((err) => {
                window.alert('Error:', err);
            });
    };

    return (
        <div className='Background'>

            <form className='LoginForm' onSubmit={handleSubmit}>
               <center><h2>Login</h2></center> 
                <label>Email:</label>
                <input
                    type="email"
                    placeholder='enter your email id'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <label>Password:</label>
                <input
                    type="password"
                    placeholder='enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <center>
                <button type='submit'>Login</button>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p></center>
            </form>

        </div>
    );
};

export default LoginForm;