"use client";

import { useState, useEffect } from "react";
import { Book, Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import YearSelector from "@/components/YearSelector/YearSelector";
import {
  useGetSubjectsQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "@/redux/api/apiSlice";

export default function SubjectsManager() {
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectYear, setNewSubjectYear] = useState("1");
  const [editingSubject, setEditingSubject] = useState(null);
  const [notification, setNotification] = useState(null);

  // RTK Query hooks
  const {
    data: subjects = [],
    isLoading: isLoadingSubjects,
    isError: isErrorSubjects,
    error: subjectsError,
  } = useGetSubjectsQuery({});
  const [createSubject, { isLoading: isCreating }] = useCreateSubjectMutation();
  const [updateSubject, { isLoading: isUpdating }] = useUpdateSubjectMutation();
  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation();

  // Monitor mutation results and show notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      setNotification({
        type: "error",
        message: "Subject name cannot be empty!",
      });
      return;
    }

    try {
      await createSubject({
        name: newSubjectName,
        year_id: newSubjectYear,
      }).unwrap();

      setNotification({
        type: "success",
        message: "Subject added successfully!",
      });
      setNewSubjectName("");
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to add subject: ${error.message || "Unknown error"}`,
      });
    }
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    if (!editingSubject || !editingSubject.name.trim()) {
      setNotification({
        type: "error",
        message: "Subject name cannot be empty!",
      });
      return;
    }

    try {
      await updateSubject({
        id: editingSubject.id,
        name: editingSubject.name,
        year_id: editingSubject.year,
      }).unwrap();

      setNotification({
        type: "success",
        message: "Subject updated successfully!",
      });
      setEditingSubject(null);
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to update subject: ${
          error.message || "Unknown error"
        }`,
      });
    }
  };

  const handleDeleteSubject = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await deleteSubject(id).unwrap();

        setNotification({
          type: "success",
          message: "Subject deleted successfully!",
        });
      } catch (error) {
        setNotification({
          type: "error",
          message: `Failed to delete subject: ${
            error.message || "Unknown error"
          }`,
        });
      }
    }
  };

  const startEditing = (subject) => {
    setEditingSubject({
      id: subject.id,
      name: subject.name,
      year: subject.year_id || subject.year,
    });
  };

  const cancelEditing = () => {
    setEditingSubject(null);
  };

  if (isLoadingSubjects) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading subjects...</span>
      </div>
    );
  }

  if (isErrorSubjects) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">
          Error loading subjects: {subjectsError?.message || "Unknown error"}
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
        <h1 className="text-3xl font-bold mb-2">Manage Subjects</h1>
        <p className="">
          Create and manage subjects for different academic years.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add/Edit Subject Form */}
        <div className="md:col-span-1">
          <div className="border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingSubject ? "Edit Subject" : "Add New Subject"}
            </h2>
            <form
              onSubmit={editingSubject ? handleUpdateSubject : handleAddSubject}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={editingSubject ? editingSubject.name : newSubjectName}
                  onChange={(e) =>
                    editingSubject
                      ? setEditingSubject({
                          ...editingSubject,
                          name: e.target.value,
                        })
                      : setNewSubjectName(e.target.value)
                  }
                  className="w-full px-4 py-2 border bg-transparent border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Academic Year
                </label>
                <YearSelector
                  value={editingSubject ? editingSubject.year : newSubjectYear}
                  onChange={(value) =>
                    editingSubject
                      ? setEditingSubject({ ...editingSubject, year: value })
                      : setNewSubjectYear(value)
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className={`flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    isCreating || isUpdating
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingSubject ? (
                    "Update Subject"
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Subject
                    </>
                  )}
                </button>
                {editingSubject && (
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Subject List */}
        <div className="md:col-span-2">
          <div className="border rounded-xl shadow-sm overflow-hidden">
            <h2 className="text-xl font-semibold p-6 border-b">Subject List</h2>
            <div className="divide-y">
              {subjects.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No subjects found. Add your first subject!
                </div>
              ) : (
                subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="px-6 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Book className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{subject.name}</h3>
                        <p className="text-sm text-gray-500">
                          Year {subject.year_id}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(subject)}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(subject.id)}
                        disabled={isDeleting}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
