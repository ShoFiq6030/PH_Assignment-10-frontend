import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

export default function MyRatingsCard({ review }) {
  const { userName, rating, reviewText, createdAt, propertyData, propertyId } =
    review;

  const date = new Date(createdAt).toLocaleDateString();

  return (
    <Link
      to={`/all-properties/${propertyId}`}
      className="bg-white shadow-md p-5 flex gap-4 hover:shadow-lg transition cursor-pointer"
    >
      {/* Thumbnail */}
      <img
        src={propertyData?.image}
        alt={propertyData?.propertyName}
        className="w-32 h-24 object-cover "
      />

      {/* Content */}
      <div className="flex-1">
        {/* Property Name */}
        <h3 className="font-semibold text-lg">{propertyData?.propertyName}</h3>

        {/* Reviewer Name */}
        <p className="text-sm text-gray-500">Reviewed by: {userName}</p>

        {/* Rating */}
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="mt-2 text-gray-700 text-sm">
          {reviewText.length > 80
            ? reviewText.substring(0, 80) + "..."
            : reviewText}
        </p>

        {/* Date */}
        <p className="text-xs text-gray-400 mt-2">{date}</p>
      </div>
    </Link>
  );
}
