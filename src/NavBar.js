// NavBar.js
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAppContext } from './App'; // Import the useAppContext hook
import './App.css'; // Import the CSS file

const NavBar = () => {
  const { loggedInUser,setLoggedInUser } = useAppContext(); // Access loggedInUser from context
  const navigate = useNavigate();

  const handlelogout = () => {
    setLoggedInUser(null);
    navigate('/');
    
  }

  return (
    <div className='image'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Budjet Bliss</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/account-creation">Sign up/Login</Link>
            </li>
            {loggedInUser && ( // Display links only if a user is logged in
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/credit">Deposit</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/debit">Withdraw</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointment">Query</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all-details">User Details</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout" onClick={handlelogout}>logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
