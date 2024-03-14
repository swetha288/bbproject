import React, { useState } from 'react';
import { useAppContext } from './App';
import './App.css'; // Ensure you have a CreditPage.css file for styling

const CreditPage = () => {
  const { updateBalance, loggedInUser } = useAppContext();
  const [creditAmount, setCreditAmount] = useState('');

  const handleCreditSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(creditAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount for credit.');
      return;
    }

    if (loggedInUser) {
      updateBalance(amount);
    } else {
      alert('User not logged in.'); // Handle the case where the user is not logged in
    }

    setCreditAmount('');
  };

  return (
    <div className='credit-page'>
      <div className="credit-container">
        <h2 className="credit-header">Deposit</h2>
        <div className="balance-text">Current Balance: ${loggedInUser ? loggedInUser.balance : 0}</div>
        <form className="credit-form" onSubmit={handleCreditSubmit}>
          <label className="credit-label">
            Credit Amount:
            <input
              className="credit-input"
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </label>
          <br />
          <button className="credit-button" type="submit">
            Credit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditPage;
