"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown } from "lucide-react";
import {
  fetchYears,
  selectAllYears,
  selectYearsStatus,
  selectYearsError,
} from "@/redux/features/yearsSlice";

export default function YearSelector({ value, onChange, className = "" }) {
  const dispatch = useDispatch();
  const years = useSelector(selectAllYears);
  const status = useSelector(selectYearsStatus);
  const error = useSelector(selectYearsError);

  // Default years as fallback
  const defaultYears = [
    { id: 1, name: "Year 1" },
    { id: 2, name: "Year 2" },
    { id: 3, name: "Year 3" },
    { id: 4, name: "Year 4" },
  ];

  useEffect(() => {
    // Only fetch if we haven't already loaded or failed
    if (status === "idle") {
      dispatch(fetchYears());
    }
  }, [status, dispatch]);

  // Show loading state
  if (status === "loading") {
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
  if (status === "failed" && error) {
    console.warn("Error loading years:", error);
  }

  // Determine which years to display - use API data or fallback
  const yearsToDisplay = years && years.length > 0 ? years : defaultYears;

  return (
    <div className="relative">
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
