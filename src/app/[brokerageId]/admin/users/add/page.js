import React from 'react';

export default function AddUser() {
  return (
    <div>
      <h1>Add User</h1>
      <form>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <select>
          <option>Agent</option>
          <option>Conveyancer</option>
          <option>Admin</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}