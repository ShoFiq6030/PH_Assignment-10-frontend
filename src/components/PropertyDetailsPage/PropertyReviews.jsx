import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../common/ConfirmModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export default function PropertyReviews({ reviewData, loading, error }) {
  const [reviews, setReviews] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setReviews(reviewData);
  }, [reviewData]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/reviews/${selectedReviewId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Review deleted successfully.");

        setReviews((prev) => prev.filter((r) => r._id !== selectedReviewId));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setOpenConfirm(false);
      setSelectedReviewId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Loading reviews...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-6">
        Error loading reviews.
      </div>
    );

  if (!reviews?.length)
    return (
      <div className="text-center text-gray-500 mt-6">
        No reviews yet. Be the first to leave a review!
      </div>
    );

  return (
    <section className="mt-12 bg-gray-50 p-6 shadow-sm relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Customer Reviews ({reviews.length})
      </h2>

      {openConfirm && (
        <ConfirmModal
          onClose={() => setOpenConfirm(false)}
          onConfirm={handleDelete}
        />
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-5  shadow-sm border hover:shadow-md transition flex justify-between"
          >
            {/* User Info */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  {review?.photoURL ? (
                    <img
                      src={review.photoURL}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-pink-600 text-xl" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">{review.userName}</h3>
                  <p className="text-sm text-gray-500">{review.userEmail}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                  )
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-700">{review.reviewText}</p>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Delete Button */}
            {user?._id === review.userId && (
              <MdDelete
                size={25}
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  setSelectedReviewId(review._id);
                  setOpenConfirm(true);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
