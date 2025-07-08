import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";

const ReviewSection = () => {
  const { productId } = useParams();
  const [userCanReview, setUserCanReview] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await authApiClient.post(
        `/products/${productId}/reviews/`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
  useEffect(() => {
    checkUserPermission();
  }, []);
  return (
    <div>
      {userCanReview && <ReviewForm onSubmit={onSubmit} />}
      <ReviewList/>
      {/* <StarRating/> */}
    </div>
  );
};

export default ReviewSection;
