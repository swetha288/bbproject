// AccountCreationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './App';
import './App.css'; // Ensure you have an AccountCreationPage.css file for styling

const AccountCreationPage = () => {
  const { addUserDetails, userDetails, setLoggedInUser } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleAccountAction = (e) => {
    e.preventDefault();

    if (isNewUser && (!name || !email || !password)) {
      setError('Please fill in all the required details.');
      return;
    }

    if (!isNewUser && (!email || !password)) {
      setError('Please fill in all the required details.');
      return;
    }

    if (isNewUser) {
      const existingUser = userDetails.find((user) => user.email === email);

      if (existingUser) {
        setError('Email already exists. Please choose a different email.');
      } else {
        const user = { name, email, password, balance: 0 };
        addUserDetails(user);
        setLoggedInUser(user);
        setError('');
        clearFields();
        alert('Account created successfully!');
        navigate('/'); // Redirect to the home page
      }
    } else {
      const existingUser = userDetails.find((user) => user.email === email && user.password === password);

      if (existingUser) {
        setLoggedInUser(existingUser);
        setError('');
        clearFields();
        alert('Login successful!');
        navigate('/'); // Redirect to the home page
      } else {
        setError('Invalid email or password.');
      }
    }
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={`account ${isNewUser ? 'sign-up' : 'login'}`}>
      <div className="account-creation-container">
        <h2>{isNewUser ? 'Sign Up' : 'Login'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAccountAction}>
          {isNewUser && (
            <>
              <label className="form-label">
                Name:
                <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <br />
            </>
          )}
          <label className="form-label">
            Email:
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label className="form-label">
            Password:
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button className="form-button" type="submit">
            {isNewUser ? 'Sign Up' : 'Login'}
          </button>
          <br />
          <button
            className="form-button"
            type="button"
            onClick={() => {
              setIsNewUser((prev) => !prev);
              setError('');
              clearFields();
            }}
          >
            {isNewUser ? 'Already have an account? Login' : 'New user? Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountCreationPage;
