import * as React from 'react';
import { useUser } from '../contexts/UserContext';

export default function TestComponent() {
  const { userStatus } = useUser();

  return (
    <div>
      <h1>Profile Page</h1>
      {userStatus ? (
        <div>
          <p>ID: {userStatus.id}</p>
          <p>Username: {userStatus.username}</p>
          <p>Admin: {userStatus.admin ? 'Yes' : 'No'}</p>
          <p>Role: {userStatus.role}</p>
        </div>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
}
