import React from 'react';
import Input from '../Shared/Input/Input';
import Button from '../Shared/Button/Button';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Signup from './SignupForm/SignupForm';
import './LoginPage.css';

function LoginPage() {
    return (
        <div>
            <h1 className='title'>Your Restaurant Finder</h1>
            <Input type="text" name="Username" placeholder="you@example.com" />
            <Input type="password" name="Password" placeholder="Password" />
            <ForgotPassword />
            <Button text="Login" />
            <Signup />  

        </div>
    );
}

export default LoginPage;
