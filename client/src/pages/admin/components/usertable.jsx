const UserTable = ({ users }) => {
  return (
    <table border="1" cellPadding="5" style={{ width: "100%", marginBottom: "10px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
