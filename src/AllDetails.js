import React from 'react';
import { useAppContext } from './App';
import './App.css';

const AllDetails = () => {
  const { userDetails, loggedInUser } = useAppContext();
  const isAdmin = loggedInUser && loggedInUser.isAdmin;
  const filteredUserDetails = isAdmin ? userDetails.filter(user => !user.isAdmin) : [loggedInUser];

  return (
    <body className="alldetails">
      <div className="all-details-container">
        <h2>All User Details</h2>
        <ul className="details-list">
          {filteredUserDetails.map((user, index) => (
            <li key={index} className="details-item">
              <strong>Name:</strong> {user?.name || 'N/A'},{' '}
              <strong>Email:</strong> {user?.email || 'N/A'},{' '}
              <strong>Balance:</strong> ${user?.balance || 0},{' '}
              {isAdmin && (
                <>
                  <strong>Query Details:</strong> {user?.queryDetails || 'No queries'}
                </>
              )}
              {!isAdmin && (
                <>
                  <strong>Your Query:</strong> {user?.queryDetails || 'No query submitted'}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </body>
  );
};

export default AllDetails;