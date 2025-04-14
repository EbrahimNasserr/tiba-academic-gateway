"use client";

import { useState } from "react";
import {
  BookOpen,
  Upload,
  User,
  LogOut,
  Book,
  ChevronRight,
  ChevronLeft,
  UserPlus,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <aside
        className={`w-64 lg:border-r bg-black dark:bg-white lg:bg-none border-gray-200 fixed h-full transition-transform z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold">Dr. Sarah Johnson</h2>
              <p className="text-sm text-gray-600">Cardiologist</p>
            </div>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab("upload");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "upload"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Lecture
            </button>
            <button
              onClick={() => {
                setActiveTab("lectures");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "lectures"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              My Lectures
            </button>
            <button
              onClick={() => {
                setActiveTab("subjects");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "subjects"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <Book className="w-5 h-5" />
              Subjects
            </button>
            <button
              onClick={() => {
                setActiveTab("doctors");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "doctors"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <UserPlus className="w-5 h-5" />
              Doctors
            </button>
            <button
              onClick={() => {
                setActiveTab("profile");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 hover:text-black ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 hover:text-black"
              }`}
            >
              <User className="w-5 h-5" />
              Edit Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-red-600">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-22 left-1 z-50 border p-1 rounded-full"
      >
        {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>
    </div>
  );
}
