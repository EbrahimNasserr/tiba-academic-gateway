"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Search,
  Upload,
} from "lucide-react";
import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "@/redux/api/apiSlice";

export default function DoctorsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [notification, setNotification] = useState(null);
  const [doctorImage, setDoctorImage] = useState(null);
  const fileInputRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    bio: "",
  });

  // RTK Query hooks
  const {
    data: doctors = [],
    isLoading: isLoadingDoctors,
    isError: isErrorDoctors,
    error: doctorsError,
    refetch,
  } = useGetDoctorsQuery({ q: searchQuery });

  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

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
      specialization: "",
      bio: "",
    });
    setDoctorImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorImage(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setNotification({
        type: "error",
        message: "Doctor name cannot be empty!",
      });
      return;
    }

    try {
      // Create FormData object to handle file uploads
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("specialization", formData.specialization);
      submitData.append("bio", formData.bio);

      if (doctorImage) {
        submitData.append("image", doctorImage);
      }

      await createDoctor(submitData).unwrap();

      setNotification({
        type: "success",
        message: "Doctor added successfully!",
      });
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to add doctor: ${
          error.data?.message || "Unknown error"
        }`,
      });
    }
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();

    if (!editingDoctor || !formData.name.trim()) {
      setNotification({
        type: "error",
        message: "Doctor name cannot be empty!",
      });
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("specialization", formData.specialization);
      submitData.append("bio", formData.bio);

      if (doctorImage) {
        submitData.append("image", doctorImage);
      }

      await updateDoctor({
        id: editingDoctor.id,
        ...submitData,
      }).unwrap();

      setNotification({
        type: "success",
        message: "Doctor updated successfully!",
      });
      resetForm();
      setEditingDoctor(null);
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to update doctor: ${
          error.data?.message || "Unknown error"
        }`,
      });
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(id).unwrap();

        setNotification({
          type: "success",
          message: "Doctor deleted successfully!",
        });
      } catch (error) {
        setNotification({
          type: "error",
          message: `Failed to delete doctor: ${
            error.data?.message || "Unknown error"
          }`,
        });
      }
    }
  };

  const startEditing = (doctor) => {
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization || "",
      bio: doctor.bio || "",
    });
    setEditingDoctor(doctor);
    setDoctorImage(null); // Reset image when starting to edit
  };

  const cancelEditing = () => {
    setEditingDoctor(null);
    resetForm();
  };

  // Loading state
  if (isLoadingDoctors) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading doctors...</span>
      </div>
    );
  }

  // Error state
  if (isErrorDoctors) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">
          Error loading doctors:{" "}
          {doctorsError?.data?.message || "Unknown error"}
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
        <h1 className="text-3xl font-bold mb-2">Manage Doctors</h1>
        <p className="text-gray-600">
          Add, edit, or remove doctors from the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Form Section */}
        <div className="md:col-span-1">
          <div className="border rounded-xl shadow-sm p-6">
            {!showAddForm && !editingDoctor ? (
              <div className="text-center p-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full"
                >
                  <Plus className="w-5 h-5" />
                  Add New Doctor
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
                </h2>
                <form
                  onSubmit={
                    editingDoctor ? handleUpdateDoctor : handleAddDoctor
                  }
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter doctor name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter specialization"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Enter doctor bio"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Profile Image
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        id="doctor-image"
                        accept="image/*"
                      />
                      <label
                        htmlFor="doctor-image"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm">Click to upload image</span>
                      </label>
                    </div>
                    {doctorImage && (
                      <div className="mt-2 text-sm">
                        Selected file: {doctorImage.name}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isCreating || isUpdating}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex-1 flex items-center justify-center gap-2"
                    >
                      {isCreating || isUpdating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {editingDoctor ? "Update Doctor" : "Add Doctor"}
                    </button>
                    <button
                      type="button"
                      onClick={
                        editingDoctor
                          ? cancelEditing
                          : () => setShowAddForm(false)
                      }
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Doctors List Section */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-12 border rounded-xl">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No doctors found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? "No doctors match your search criteria."
                  : "Start by adding a new doctor."}
              </p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Doctor
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="border rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {doctor.image ? (
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      {doctor.specialization && (
                        <p className="text-sm text-gray-600">
                          {doctor.specialization}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(doctor)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                      disabled={isDeleting || isUpdating}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
