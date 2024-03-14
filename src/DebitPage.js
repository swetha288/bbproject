import React, { useState } from 'react';
import { useAppContext } from './App';
import './App.css'; // Ensure you have a DebitPage.css file for styling

const DebitPage = () => {
  const { updateBalance, loggedInUser } = useAppContext();
  const [debitAmount, setDebitAmount] = useState('');

  const handleDebitSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(debitAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount for debit.');
      return;
    }

    // Check if loggedInUser is not null before accessing its properties
    if (!loggedInUser) {
      alert('User not logged in.'); // Handle the case where the user is not logged in
      return;
    }

    if (amount > loggedInUser.balance) {
      alert('Insufficient balance for debit.');
      return;
    }

    // Update the balance for the currently logged-in user
    updateBalance(-amount);
    
    setDebitAmount('');
  };

  return (
    <div className='debit-page'>
      <div className="debit-container">
        <h2 className="debit-header">Withdraw</h2>
        {/* Check if loggedInUser is not null before accessing its properties */}
        <div className="balance-text">Current Balance: ${loggedInUser ? loggedInUser.balance : 0}</div>
        <form className="debit-form" onSubmit={handleDebitSubmit}>
          <label className="debit-label">
            Debit Amount:
            <input
              className="debit-input"
              type="number"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </label>
          <br />
          <button className="debit-button" type="submit">
            Debit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DebitPage;
