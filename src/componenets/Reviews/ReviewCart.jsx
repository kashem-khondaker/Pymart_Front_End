import React from "react";
import { FaStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditReviewForm from "./EditReviewForm";

const ReviewCart = ({
  review,
  user,
  editReview,
  setEditReview,
  onEditClick,
  isEditing,
  onCancelEdit
}) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border border-base-200 rounded-xl overflow-hidden mt-6">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <p className="font-semibold">{review.user.name} </p>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.ratings ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {user && user.id == review.user.id ? (
            <div className="flex gap-2">
              <button
                onClick={onEditClick}
                className="btn btn-sm btn-outline btn-primary"
              >
                Edit
              </button>
              <button className="btn btn-sm btn-outline btn-error">
                Delete
              </button>
            </div>
          ) : (
            <div>
              <BsThreeDotsVertical
                size={20}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </div>
          )}
        </div>

        {isEditing ? (
          <EditReviewForm
            editReview={editReview}
            setEditReview={setEditReview}
            onCancelEdit={onCancelEdit}
          />
        ) : (
          <div className="mt-4">
            <p className="leading-relaxed whitespace-pre-line">
              {" "}
              {review.comment}{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCart;
