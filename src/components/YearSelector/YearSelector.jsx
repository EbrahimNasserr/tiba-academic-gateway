"use client";

import { ChevronDown } from "lucide-react";
import { useGetYearsQuery } from "@/redux/api/apiSlice";

export default function YearSelector({ value, onChange, className = "" }) {
  const { data: years = [], isLoading, isError, error } = useGetYearsQuery();

  // Default years as fallback
  const defaultYears = [
    { id: 5, name: "Year 1" },
    { id: 6, name: "Year 2" },
    { id: 7, name: "Year 3" },
    { id: 8, name: "Year 4" },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative">
        <select
          disabled
          className={`w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg opacity-70 ${className}`}
        >
          <option>Loading years...</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>
    );
  }

  // Log error but use fallback years
  if (isError && error) {
    console.warn("Error loading years:", error);
  }

  // Determine which years to display - use API data or fallback
  const yearsToDisplay = years && years.length > 0 ? years : defaultYears;

  return (
    <div className="relative w-full">
      <select
        name="year"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border border-gray-200 bg-black dark:bg-white text-white dark:text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${className}`}
      >
        {yearsToDisplay.map((year) => (
          <option key={year.id} value={year.id.toString()}>
            {year.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
