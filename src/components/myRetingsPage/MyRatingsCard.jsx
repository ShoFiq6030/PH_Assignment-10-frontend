import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";

export default function MyRatingsCard({ review }) {
  const { userName, rating, reviewText, createdAt, propertyData, propertyId } =
    review;

  const { theme } = useTheme();

  const date = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

  return (
    <Link
      to={`/all-properties/${propertyId}`}
      className={`
        rounded-xl p-5 flex gap-4 transition cursor-pointer shadow-md 
        hover:shadow-lg border
        ${
          theme === "dark"
            ? "bg-gray-500 border-gray-700 hover:shadow-gray-900"
            : "bg-white border-gray-200 hover:shadow-gray-300"
        }
      `}
    >
      {/* Thumbnail */}
      <img
        src={propertyData?.image}
        alt={propertyData?.propertyName}
        className="w-32 h-24 object-cover rounded-md"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Property Name */}
        <h3
          className={`font-semibold text-lg ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {propertyData?.propertyName}
        </h3>

        {/* Reviewer Name */}
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Reviewed by: {userName}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`${
                star <= rating
                  ? "text-yellow-500"
                  : theme === "dark"
                  ? "text-gray-600"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {reviewText.length > 80
            ? reviewText.substring(0, 80) + "..."
            : reviewText}
        </p>

        {/* Date */}
        <p
          className={`text-xs mt-2 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}
