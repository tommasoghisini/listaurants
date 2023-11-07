import React, { useState } from 'react';
import Button from '../Shared/Button/Button';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Signup from './SignupForm/SignupForm';
import './LoginPage.css';
import LoginForm from './LoginForm/LoginForm';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
            <h1 className='title'>Your Restaurant Finder</h1>
            <LoginForm
                email={email}
                password={password}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
            />
            <ForgotPassword />
            <Button text="Login" onClick={handleSubmit} />
            <Signup />
        </div>
    );
}

export default LoginPage;
