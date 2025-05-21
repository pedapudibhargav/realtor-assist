import React from 'react';

export default function Roles() {
  const roles = ['Admin', 'Agent', 'Conveyancer'];
  return (
    <div>
      <h1>Roles</h1>
      <ul>
        {roles.map(role => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </div>
  );
}