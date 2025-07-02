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
    <div className="flex flex-col gap-y-4 p-6">
      <h1 className="title">Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-base text-slate-600 dark:text-slate-400">No users found.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-head">Name</th>
                <th className="table-head">Email</th>
                <th className="table-head">Verified</th>
                <th className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="table-row">
                  <td className="table-cell">{u.name}</td>
                  <td className="table-cell">{u.email}</td>
                  <td className="table-cell">{u.isVerified ? "✅" : "❌"}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="btn-ghost border border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editUser && (
        <div className="card w-full max-w-md">
          <h2 className="card-title text-xl">Edit User</h2>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">
            Name:
            <input
              className="input mt-1"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">
            Email:
            <input
              className="input mt-1"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-2">
            Verified:
            <select
              className="input mt-1"
              value={editUser.isVerified}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  isVerified: e.target.value === "true",
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <div className="mt-4 flex justify-end gap-x-2">
            <button
              onClick={handleUpdate}
              className="btn-ghost border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
            >
              Save
            </button>
            <button
              onClick={() => setEditUser(null)}
              className="btn-ghost border border-slate-300 text-slate-600 hover:bg-slate-200 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
