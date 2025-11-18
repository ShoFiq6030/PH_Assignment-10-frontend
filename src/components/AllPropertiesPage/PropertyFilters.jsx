import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { IoMdSearch } from "react-icons/io";

export default function PropertyFilters({
  search,
  setSearch,
  sortByPrice,
  setSortByPrice,
  sortByTime,
  setSortByTime,
}) {
  const { theme } = useTheme();

  // Dropdown open states
  const [priceOpen, setPriceOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  // Handle click and stop event bubbling
  const handlePriceSort = (value, e) => {
    e.stopPropagation();
    setSortByPrice(value);
    setSortByTime("");
    setPriceOpen(false);
  };

  const handleTimeSort = (value, e) => {
    e.stopPropagation();
    setSortByTime(value);
    setSortByPrice("");
    setTimeOpen(false);
  };

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = () => {
      setPriceOpen(false);
      setTimeOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-400" : "bg-white"
      } shadow p-4 rounded-lg mb-6 w-full`}
      onClick={(e) => e.stopPropagation()} // prevent bubbling from container
    >
      <div className="flex justify-between w-full gap-4 flex-wrap">
        {/* Sort By Price */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPriceOpen(!priceOpen);
            }}
            className="btn w-40 flex justify-between"
          >
            {sortByPrice === "asc"
              ? "Price: Low → High"
              : sortByPrice === "desc"
              ? "Price: High → Low"
              : "Sort by Price 🔽"}
          </button>

          {priceOpen && (
            <ul className="absolute menu bg-base-100 rounded-box z-50 w-52 p-2 shadow mt-1">
              <li>
                <a onClick={(e) => handlePriceSort("", e)}>Default</a>
              </li>
              <li>
                <a onClick={(e) => handlePriceSort("asc", e)}>Low → High</a>
              </li>
              <li>
                <a onClick={(e) => handlePriceSort("desc", e)}>High → Low</a>
              </li>
            </ul>
          )}
        </div>

        {/* Sort By Time */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTimeOpen(!timeOpen);
            }}
            className="btn w-40 flex justify-between"
          >
            {sortByTime === "asc"
              ? "Old → New"
              : sortByTime === "desc"
              ? "New → Old"
              : "Sort by Time 🔽"}
          </button>

          {timeOpen && (
            <ul className="absolute menu bg-base-100 rounded-box z-50 w-52 p-2 shadow mt-1">
              <li>
                <a onClick={(e) => handleTimeSort("", e)}>Default</a>
              </li>
              <li>
                <a onClick={(e) => handleTimeSort("asc", e)}>Old → New</a>
              </li>
              <li>
                <a onClick={(e) => handleTimeSort("desc", e)}>New → Old</a>
              </li>
            </ul>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          {" "}
          <input
            type="text"
            placeholder="Search by property name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-pink-500 p-2 rounded max-w-60"
          />
          <div className="absolute top-2 right-2">
            <IoMdSearch size={26} className="text-pink-600"/>
          </div>
        </div>
      </div>
    </div>
  );
}
