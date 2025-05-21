export default function EditUser() {
  return (
    <div>
      <h1>Edit User</h1>
      <form>
        <input placeholder="Name" defaultValue="Alice Smith" />
        <input placeholder="Email" defaultValue="alice@example.com" />
        <select defaultValue="Agent">
          <option>Agent</option>
          <option>Conveyancer</option>
          <option>Admin</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}