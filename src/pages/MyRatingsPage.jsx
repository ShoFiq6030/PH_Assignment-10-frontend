import React from "react";
import { useApi } from "../hooks/useApi";
import Loading from "../components/common/Loading";
import MyRatingsCard from "../components/myRetingsPage/MyRatingsCard";

export default function MyRatingsPage() {
  const {
    data: reviews,
    loading,
    error,
  } = useApi({
    url: `/api/reviews/my-reviews`,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Ratings</h1>

      {error && <p className="text-red-500">Something went wrong.</p>}

      {loading ? (
        <Loading />
      ) : reviews?.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have not reviewed any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews?.map((review) => (
            <MyRatingsCard review={review} key={review._id} />
          ))}
        </div>
      )}
    </div>
  );
}
