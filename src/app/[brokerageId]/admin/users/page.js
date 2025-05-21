import React from 'react';

export default function UsersList() {
  const users = [
    { id: 1, name: 'Alice Smith', role: 'Agent' },
    { id: 2, name: 'Bob Jones', role: 'Conveyancer' },
    { id: 3, name: 'Carol White', role: 'Admin' },
  ];
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}