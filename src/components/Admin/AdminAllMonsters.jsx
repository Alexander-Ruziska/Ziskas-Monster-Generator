import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminAllMonsters.css";

function AdminAllMonsters() {
  const [monsters, setMonsters] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Fetch all monsters
        const monstersResponse = await axios.get("/api/monster/admin");
        setMonsters(monstersResponse.data);

        // Fetch all users to get usernames
        const usersResponse = await axios.get("/api/user/admin");
        const usersMap = {};
        usersResponse.data.forEach(user => {
          usersMap[user.id] = user.username;
        });
        setUsers(usersMap);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const handleDelete = async (monsterId) => {
    if (window.confirm("Are you sure you want to delete this monster?")) {
      try {
        await axios.delete(`/api/monster/delete/${monsterId}`);
        setMonsters((prev) => prev.filter((monster) => monster.id !== monsterId));
      } catch (error) {
        console.error("Error deleting monster:", error);
        alert("Failed to delete monster");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading all monsters...</div>;
  }

  return (
    <div className="admin-all-monsters">
      <h2 style={{ marginTop: "100px", fontSize: '36px' }}>
        All Monsters - Admin View
      </h2>
      <p>Total Monsters: {monsters.length}</p>
      
      <div className="monsters-grid">
        {monsters.map((monster) => (
          <div key={monster.id} className="monster-card">
            <div className="monster-header">
              <h3>{monster.name}</h3>
              <span className="monster-user">
                Created by: {users[monster.user_id] || 'Unknown User'}
              </span>
            </div>
            
            {monster.image_url && (
              <img 
                src={monster.image_url} 
                alt={monster.name}
                className="admin-monster-image"
              />
            )}
            
            <div className="monster-details">
              <p><strong>Size:</strong> {monster.size}</p>
              <p><strong>Type:</strong> {monster.type}</p>
              <p><strong>Alignment:</strong> {monster.alignment}</p>
              <p><strong>Challenge Rating:</strong> {monster.challenge_rating}</p>
              <p><strong>Created:</strong> {new Date(monster.created).toLocaleDateString()}</p>
            </div>
            
            <div className="monster-actions">
              <button 
                className="btn btn-danger"
                onClick={() => handleDelete(monster.id)}
              >
                Delete Monster
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {monsters.length === 0 && (
        <p>No monsters found in the database.</p>
      )}
    </div>
  );
}

export default AdminAllMonsters;