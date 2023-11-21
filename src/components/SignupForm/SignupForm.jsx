import React from 'react';
import { Link } from 'react-router-dom';
import './SignupForm.css';

function Signup() {
  return (
    <div className='signup'>
      <p>Don't have an account yet? <Link to="/signup" className='signup-link'>Sign up now</Link></p>
    </div>
  );
}

export default Signup;
