"use client";

import { useState, useEffect } from "react";
import {
  User,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Search,
  Shield,
  Lock,
} from "lucide-react";
import {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from "@/redux/api/apiSlice";

export default function AdminsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loggedInAdminEmail, setLoggedInAdminEmail] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "admin",
  });

  // RTK Query hooks
  const {
    data: admins = [],
    isLoading: isLoadingAdmins,
    isError: isErrorAdmins,
    error: adminsError,
    refetch,
  } = useGetAdminsQuery({ q: searchQuery });

  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  // Get logged in admin email from localStorage on component mount
  useEffect(() => {
    const email = localStorage.getItem("adminEmail");  
    if (email) {
      setLoggedInAdminEmail(email.trim()); // Trim any whitespace
    } else {
      console.warn("No admin email found in localStorage");
    }
  }, []);

  // Function to check if admin can edit another admin
  const canEditAdmin = (adminEmail) => {
    if (!loggedInAdminEmail) {
      console.warn("No logged in admin email found");
      return false;
    }
    console.log("Detailed edit permission check:", {
      loggedInEmail: loggedInAdminEmail,
      targetEmail: adminEmail,
      isExactMatch: loggedInAdminEmail === adminEmail,
      isAdminExample: loggedInAdminEmail === "admin@example.com",
      loggedInEmailType: typeof loggedInAdminEmail,
      targetEmailType: typeof adminEmail,
      loggedInEmailLength: loggedInAdminEmail?.length,
      targetEmailLength: adminEmail?.length
    });
    return loggedInAdminEmail === "admin@example.com" || loggedInAdminEmail === adminEmail;
  };

  // Function to check if admin can delete another admin
  const canDeleteAdmin = (adminEmail) => {
    if (!loggedInAdminEmail) {
      return false;
    }
    return loggedInAdminEmail === "admin@example.com";
  };

  // Clear notifications after timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "admin",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      (!editingAdmin && !formData.password)
    ) {
      setNotification({
        type: "error",
        message: "Please fill all required fields!",
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setNotification({
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    try {
      await createAdmin(formData).unwrap();

      setNotification({
        type: "success",
        message: "Admin added successfully!",
      });
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to add admin: ${
          error.data?.message || "Unknown error"
        }`,
      });
    }
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();

    if (!editingAdmin || !formData.name.trim() || !formData.email.trim()) {
      setNotification({
        type: "error",
        message: "Name and email are required!",
      });
      return;
    }

    if (
      formData.password &&
      formData.password !== formData.password_confirmation
    ) {
      setNotification({
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    try {
      // Only include password in update if it's provided
      const updateData = {
        id: editingAdmin.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        updateData.password = formData.password;
        updateData.password_confirmation = formData.password_confirmation;
      }

      await updateAdmin(updateData).unwrap();

      setNotification({
        type: "success",
        message: "Admin updated successfully!",
      });
      resetForm();
      setEditingAdmin(null);
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to update admin: ${
          error.data?.message || "Unknown error"
        }`,
      });
    }
  };

  const handleDeleteAdmin = async (id, email) => {
    if (!canDeleteAdmin(email)) {
      setNotification({
        type: "error",
        message: "You don't have permission to delete admin accounts",
      });
      return;
    }

    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await deleteAdmin(id).unwrap();

        setNotification({
          type: "success",
          message: "Admin deleted successfully!",
        });
      } catch (error) {
        setNotification({
          type: "error",
          message: `Failed to delete admin: ${
            error.data?.message || "Unknown error"
          }`,
        });
      }
    }
  };

  const startEditing = (admin) => {
    if (!canEditAdmin(admin.email)) {
      setNotification({
        type: "error",
        message: "You don't have permission to edit this admin's account",
      });
      return;
    }

    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      password_confirmation: "",
      role: admin.role || "admin",
    });
    setEditingAdmin(admin);
  };

  const cancelEditing = () => {
    setEditingAdmin(null);
    resetForm();
  };

  // Loading state
  if (isLoadingAdmins) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading admins...</span>
      </div>
    );
  }

  // Error state
  if (isErrorAdmins) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">
          Error loading admins: {adminsError?.data?.message || "Unknown error"}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Admins</h1>
        <p className="text-gray-600">
          Add, edit, or remove administrators from the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Admin Form Section */}
        <div className="md:col-span-1">
          <div className="border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              {editingAdmin ? "Edit Admin" : "Add New Admin"}
            </h2>

            {!editingAdmin && !showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Admin
              </button>
            ) : (
              <form
                onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                    {editingAdmin ? " (Leave blank to keep unchanged)" : "*"}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingAdmin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                    {editingAdmin ? " (Leave blank to keep unchanged)" : "*"}
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingAdmin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isCreating || isUpdating}
                  >
                    {isCreating || isUpdating ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : editingAdmin ? (
                      "Update Admin"
                    ) : (
                      "Add Admin"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      cancelEditing();
                      setShowAddForm(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Admin List Section */}
        <div className="md:col-span-2">
          <div className="border rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Administrators</h2>

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search admins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {admins.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-xl">
                <Shield className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500">No administrators found</p>
                {!showAddForm && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Admin
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin, index) => {
                      const canEdit = loggedInAdminEmail && (loggedInAdminEmail === admin.email || loggedInAdminEmail === "admin@example.com");
                      return (
                        <tr
                          key={admin.id}
                          className="border-b dark:hover:bg-gray-50 "
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              {admin.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">{admin.email}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                admin.role === "super_admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {admin.role === "super_admin"
                                ? "Super Admin"
                                : "Admin"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              {canEdit && (
                                <button
                                  onClick={() => startEditing(admin)}
                                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                              )}
                              {canDeleteAdmin(admin.email) && index !== 0 && (
                                <button
                                  onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                                  className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 transition-colors"
                                  title="Delete"
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
