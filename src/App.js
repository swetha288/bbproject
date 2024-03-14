// App.js
import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import HomePage from './HomePage';
import AccountCreationPage from './AccountCreationPage';
import CreditPage from './CreditPage';
import DebitPage from './DebitPage';
import AppointmentPage from './AppointmentPage';
import AllDetails from './AllDetails';

// Create context
const AppContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userDetails, setUserDetails] = useState([
    { name: 'Admin', email: 'admin@example.com', password: 'admin123', isAdmin: true },
  ]);

  const updateUserInfo = (updatedUser) => {
    setUserDetails((prevUsers) =>
      prevUsers.map((user) =>
        user.email === (loggedInUser?.email || updatedUser.email)
          ? {
              ...user,
              ...updatedUser,
            }
          : user
      )
    );

    setLoggedInUser((prevUser) =>
      prevUser && prevUser.email === updatedUser.email ? updatedUser : prevUser
    );
  };

  const addUserDetails = (user) => {
    setUserDetails((prevUsers) => [
      ...prevUsers,
      { ...user, credited: 0, debited: 0, isAdmin: false },
    ]);
  };

  const updateBalance = (amount, appointmentDate) => {
    setLoggedInUser((prevUser) => ({
      ...prevUser,
      balance: prevUser.balance + amount,
      appointmentDate: appointmentDate || prevUser.appointmentDate,
    }));

    setUserDetails((prevUsers) =>
      prevUsers.map((user) =>
        user.email === loggedInUser.email
          ? {
              ...user,
              balance: user.balance + amount,
            }
          : user
      )
    );
  };

  const contextValue = {
    loggedInUser,
    setLoggedInUser,
    updateUserInfo,
    userDetails,
    addUserDetails,
    updateBalance, // Add the updateBalance function
  };

  return (
    <Router>
      <AppContext.Provider value={contextValue}>
        <div>
          <NavBar />
          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account-creation" element={<AccountCreationPage />} />
              <Route path="/credit" element={<CreditPage />} />
              <Route path="/debit" element={<DebitPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/all-details" element={<AllDetails />} />
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </Router>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export default App;
