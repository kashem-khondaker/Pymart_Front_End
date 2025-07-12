import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import { MdRateReview } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
  const { productId } = useParams();
  const [userCanReview, setUserCanReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useAuthContext();
  const [editReview, setEditReview] = useState({ ratings: 0, comment: "" });
  const [editingId , setEditingId] = useState(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/products/${productId}/reviews/`);
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage(null); // clear previous error
    console.log(data);
    try {
      const response = await authApiClient.post(
        `/products/${productId}/reviews/`,
        data
      );
      console.log(response.data);
      fetchReviews();
    } catch (error) {
      console.log("Review error:", error);
      if (error.response?.data?.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Something went wrong while submitting your review.");
      }
    }
  };

  const checkUserPermission = async () => {
    try {
      const response = await authApiClient.get(
        `/orders/has-ordered/${productId}`
      );
      setUserCanReview(response.data.hasOrdered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      await authApiClient.put(`/products/${productId}/reviews/${reviewId}/`,editReview)
      setEditingId(null);
      fetchReviews();
    } catch (error) {
      console.log("Review error" , error);
    }
  }

  useEffect(() => {
    checkUserPermission();
    fetchReviews();
  }, []);
  return (
    <div className=" pt-15">
      {userCanReview && <ReviewForm onSubmit={onSubmit} />}
      {errorMessage && (
        <div className="max-w-xl mx-auto mt-4 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between space-x-3 mb-2 mt-16">
        <h2 className="text-2xl font-bold text-center text-base-content">
          Customer Reviews
        </h2>
        <div className="badge badge-outline">
          {reviews.length}{" "}
          {(reviews.length === 1) | (reviews.length === 0)
            ? "Review"
            : "Reviews"}
        </div>
      </div>

      <div className="divider"></div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-base-100  max-w-xl mx-auto">
          <div className="flex justify-center mb-4 text-gray-300">
            <MdRateReview size={64} />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-400">
            No Reviews Yet
          </h3>
          <p className="text-base text-base-content/70">
            Be the first to share your experience with this product!
          </p>
        </div>
      ) : (
        <ReviewList
          reviews={reviews}
          user={user}
          editReview={editReview}
          setEditReview={setEditReview}
          editingId={editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
        />
      )}
    </div>
  );
};

export default ReviewSection;
