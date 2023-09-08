import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform validation here
      const usernameRegex = /^[a-zA-Z\s]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const minPasswordLength = 6;
      const maxPasswordLength = 20;
  
      setUsernameError('');
      setEmailError('');
      setPasswordError('');
  
      let hasError = false;
  
      if (!username.trim()) {
        setUsernameError('Please enter a username');
        hasError = true;
      } else if (!usernameRegex.test(username)) {
        setUsernameError('Username must contain only alphabetic characters');
        hasError = true;
      }
  
      if (!email.trim()) {
        setEmailError('Please enter an email address');
        hasError = true;
      } else if (!emailRegex.test(email)) {
        setEmailError('Enter a valid email address');
        hasError = true;
      }
  
      if (!password.trim()) {
        setPasswordError('Please enter a password');
        hasError = true;
      } else if (!passwordRegex.test(password)) {
        setPasswordError(
          'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
        );
        hasError = true;
      } else if (
        password.length < minPasswordLength ||
        password.length > maxPasswordLength
      ) {
        setPasswordError(
          `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters`
        );
        hasError = true;
      }
  
      if (hasError) {
        return;
      }

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((res) => {
                if (res.ok) {
                  window.alert('Registration successful');
                  navigate('/login');
                } else {
                  window.alert('Registration failed');
                }
            })
            .catch((err) => {
              window.alert('Error:', err);
            });
    };

    return (
        <div className='Background'>
           
            <form className='RegisterForm' onSubmit={handleSubmit}>
                <center> <h2>Registration</h2></center>
                <label>Username:</label>
                <input
                    type="text"
                    placeholder='enter your name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
                {usernameError && <p className="Error">{usernameError}</p>}
               
                <label>Email:</label>
                <input
                    type="email"
                    placeholder='enter your email id'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  
                />
                {emailError && <p className="Error">{emailError}</p>}
                
                <label>Password:</label>
                <input
                    type="password"
                    placeholder='enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   
                />
                {passwordError && <p className="Error">{passwordError}</p>}
                <br/>
                <center>
                <button type="submit">Register</button>
                <p>
                Already have an account? <Link to="/login">Login</Link>
            </p></center>
            </form>
           
        </div>
    );
};

export default RegistrationForm;