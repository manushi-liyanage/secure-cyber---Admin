import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:6060/api/admin/users";
const token = localStorage.getItem("adminToken");

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/${editUser._id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Verified</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.isVerified ? "✅" : "❌"}</td>
                <td className="p-2">
                  {/* <button
                    onClick={() => setEditUser(u)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal
      {editUser && (
        <div className="mt-6 border rounded p-4 bg-white shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <label className="block mb-2">
            Name:
            <input
              className="w-full border p-2 rounded mt-1"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              className="w-full border p-2 rounded mt-1"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />
          </label>
          <label className="block mb-4">
            Verified:
            <select
              className="w-full border p-2 rounded mt-1"
              value={editUser.isVerified}
              onChange={(e) =>
                setEditUser({ ...editUser, isVerified: e.target.value === "true" })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditUser(null)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div> */}
      )}
    </div>
  );
}
