import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../../../_services/users";
import { RotateCw, Trash2, Edit2, Check, X } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingRole, setEditingRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengambil data users";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        setOpenDropdownId(null);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Gagal menghapus user");
      }
    }
  };

  const handleEditRole = async (id, currentRole) => {
    setEditingUserId(id);
    setEditingRole(currentRole);
  };

  const handleSaveRole = async (id) => {
    try {
      const response = await updateUser(id, { role: editingRole });
      if (response.success) {
        setUsers(
          users.map((u) => (u.id === id ? { ...u, role: editingRole } : u)),
        );
        setEditingUserId(null);
        setEditingRole("");
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Gagal mengupdate role user");
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4">
              <strong>Error: </strong>
              {error}
              <button
                onClick={() => setError(null)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                User Management
              </h1>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCw
                  size={16}
                  className={`mr-2 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Joined Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.name}
                      </th>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        {editingUserId === user.id ? (
                          <div className="flex gap-2 items-center">
                            <select
                              value={editingRole}
                              onChange={(e) => setEditingRole(e.target.value)}
                              className="px-2 py-1 rounded border border-gray-300 dark:bg-gray-600 dark:text-white"
                            >
                              <option value="customer">Customer</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => handleSaveRole(user.id)}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                              title="Save"
                            >
                              <Check size={14} />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingUserId(null);
                                setEditingRole("");
                              }}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                              title="Cancel"
                            >
                              <X size={14} />
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                            }`}
                          >
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end relative">
                        <button
                          id={`dropdown-button-${user.id}`}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                          onClick={() => toggleDropdown(user.id)}
                          title="More options"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>

                        {openDropdownId === user.id && (
                          <div
                            id="user-dropdown"
                            className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            style={{ top: "100%", right: "0" }}
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby={`dropdown-button-${user.id}`}
                            >
                              <li>
                                <button
                                  onClick={() =>
                                    handleEditRole(user.id, user.role)
                                  }
                                  className="flex items-center gap-2 w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  <Edit2 size={14} />
                                  Edit Role
                                </button>
                              </li>
                            </ul>
                            <div className="py-1">
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="flex items-center gap-2 w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-3 text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
