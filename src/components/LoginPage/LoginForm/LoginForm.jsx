import React from 'react';
import Input from '../../Shared/Input/Input';
import './LoginForm.css';

const LoginForm = ({ email, password, handleEmailChange, handlePasswordChange }) => {
    return (
        <form>
            <div className="input-field">
                <Input
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                /> </div>
            < div className="input-field">
                <Input
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                /> </div>
        </form>
    );
};

export default LoginForm;
