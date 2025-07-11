import { useForm } from "react-hook-form";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const ratingValue = watch("ratings", 0);
  return (
    <div className="mt-10 bg-white shadow-md p-5 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-gray-800 text-[15px]"
      >
        {/* Rating */}
        <div>
          <label className="block mb-1">
            <span className="text-lg font-medium text-gray-700 leading-snug">
              Overall Rating
            </span>
          </label>
          <StarRating
            onChange={(value) => setValue("ratings", value)}
            ratings={ratingValue}
          />
          {errors.ratings && (
            <p className="text-sm text-red-500 mt-1">Ratings is required</p>
          )}
          <input type="hidden" {...register("ratings", { required: true })} />
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-1">
            <span className="text-lg font-medium text-gray-700 leading-snug">
              Your Review
            </span>
          </label>
          <textarea
            {...register("comment", { required: true })}
            className={`textarea textarea-bordered w-full min-h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
              errors.comment ? "border-red-500" : ""
            }`}
            placeholder="Write your thoughts about this product..."
          ></textarea>
          {errors.comment && (
            <p className="text-sm text-red-500 mt-1">Comment is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-left">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary px-6 py-2 rounded-lg shadow hover:shadow-md transition duration-300 mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs mr-2"></span>
                Submitting ...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
