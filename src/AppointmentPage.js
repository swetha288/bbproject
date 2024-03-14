import React, { useState } from 'react';
import { useAppContext } from './App';
import './App.css';

const AppointmentPage = () => {
  const { loggedInUser, updateUserInfo } = useAppContext();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleQuerySubmit = (e) => {
    e.preventDefault();

    if (!query) {
      setError('Please enter your query before submitting.');
      return;
    }

    const updatedUser = {
      ...loggedInUser,
      queryDetails: query,
    };

    updateUserInfo(updatedUser);

    alert(`Query submitted successfully: ${query}`);
    setQuery('');
    setError('');
  };

  return (
    <body className="appointment">
      <div className="appointment-container">
        <h4>If you have any inquiries or questions, please feel free to leave us a message. We're here to assist you</h4>

        {error && <div className="error-message">{error}</div>}

        <form className="appointment-form" onSubmit={handleQuerySubmit}>
          <label className="appointment-label">
            Your Query:
            <textarea
              className="appointment-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </label>
          <br />
          <button className="appointment-button" type="submit">
            Submit Query
          </button>
        </form>
      </div>
    </body>
  );
};

export default AppointmentPage;
