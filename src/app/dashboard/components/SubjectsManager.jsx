"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Book, Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import YearSelector from "@/components/YearSelector/YearSelector";
import {
  fetchSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  selectAllSubjects,
  selectSubjectsStatus,
  selectCreateStatus,
  selectUpdateStatus,
  selectDeleteStatus,
  selectSubjectsError,
  resetSubjectsStatus,
} from "@/redux/features/subjectsSlice";

export default function SubjectsManager() {
  const dispatch = useAppDispatch();

  const subjects = useAppSelector(selectAllSubjects);
  const status = useAppSelector(selectSubjectsStatus);
  const createStatus = useAppSelector(selectCreateStatus);
  const updateStatus = useAppSelector(selectUpdateStatus);
  const deleteStatus = useAppSelector(selectDeleteStatus);
  const error = useAppSelector(selectSubjectsError);

  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectYear, setNewSubjectYear] = useState("1");
  const [editingSubject, setEditingSubject] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch subjects when component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSubjects());
    }
  }, [status, dispatch]);

  // Monitor status changes and show notifications
  useEffect(() => {
    if (createStatus === "succeeded") {
      setNotification({
        type: "success",
        message: "Subject added successfully!",
      });
      setNewSubjectName("");
      dispatch(resetSubjectsStatus());
    } else if (createStatus === "failed") {
      setNotification({
        type: "error",
        message: `Failed to add subject: ${error}`,
      });
      dispatch(resetSubjectsStatus());
    }

    if (updateStatus === "succeeded") {
      setNotification({
        type: "success",
        message: "Subject updated successfully!",
      });
      setEditingSubject(null);
      dispatch(resetSubjectsStatus());
    } else if (updateStatus === "failed") {
      setNotification({
        type: "error",
        message: `Failed to update subject: ${error}`,
      });
      dispatch(resetSubjectsStatus());
    }

    if (deleteStatus === "succeeded") {
      setNotification({
        type: "success",
        message: "Subject deleted successfully!",
      });
      dispatch(resetSubjectsStatus());
    } else if (deleteStatus === "failed") {
      setNotification({
        type: "error",
        message: `Failed to delete subject: ${error}`,
      });
      dispatch(resetSubjectsStatus());
    }

    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [createStatus, updateStatus, deleteStatus, error, notification, dispatch]);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      setNotification({
        type: "error",
        message: "Subject name cannot be empty!",
      });
      return;
    }

    dispatch(
      createSubject({
        name: newSubjectName,
        year_id: newSubjectYear,
      })
    );
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    if (!editingSubject || !editingSubject.name.trim()) {
      setNotification({
        type: "error",
        message: "Subject name cannot be empty!",
      });
      return;
    }

    dispatch(
      updateSubject({
        id: editingSubject.id,
        subjectData: {
          name: editingSubject.name,
          year_id: editingSubject.year,
        },
      })
    );
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      dispatch(deleteSubject(id));
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

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading subjects...</span>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading subjects: {error}</p>
        <button
          onClick={() => dispatch(fetchSubjects())}
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
                  disabled={
                    createStatus === "loading" || updateStatus === "loading"
                  }
                  className={`flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    createStatus === "loading" || updateStatus === "loading"
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {createStatus === "loading" || updateStatus === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingSubject ? (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Update Subject
                    </>
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
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
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
          <div className="border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Subject List</h2>
            <div className="space-y-4">
              {subjects.length === 0 ? (
                <p className="text-center py-4 text-gray-500">
                  No subjects added yet
                </p>
              ) : (
                subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Book className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{subject.name}</h3>
                        <p className="text-sm text-gray-500">
                          Year {subject.year_id || subject.year}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(subject)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(subject.id)}
                        disabled={deleteStatus === "loading"}
                        className={`p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors ${
                          deleteStatus === "loading"
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {deleteStatus === "loading" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
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
