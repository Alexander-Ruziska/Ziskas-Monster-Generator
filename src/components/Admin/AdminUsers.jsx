import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import "./AdminUsers.css"; 

function AdminUsers() {
  const users = useStore((state) => state.users);
  const fetchUsers = useStore((state) => state.fetchUsers);
  const archiveUser = useStore((state) => state.archiveUser);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="users" style={{ marginTop: "100px"}}>
      <h2 style={{fontSize: '36px' }}>Welcome to FableSpire Admin!</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <button 
          className="btn btn-success"
          onClick={() => navigate('/admin/all-monsters')}
          style={{ marginRight: "10px" }}
        >
          View All Monsters
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th><strong>User Name</strong></th>
            <th><strong>Created</strong></th>
            <th><strong>Actions</strong></th>
            <th><strong>Monsters</strong></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{new Date(user.created).toLocaleDateString()}</td>
              <td>
                <button 
                  className="btn btn-dark mt-4" 
                  onClick={() => archiveUser(user.id)}
                >
                  Archive
                </button>
              </td>
              <td>
                <button 
                  className="btn btn-primary mt-4"
                  onClick={() => navigate(`/admin/monsters/${user.id}`)}
                >
                  View Monsters
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
