import ReviewCart from "./ReviewCart";

const ReviewList = ({
  reviews,
  user,
  editReview,
  setEditReview,
  editingId,
  setEditingId,
  handleUpdateReview,
}) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCart
          key={review.id}
          review={review}
          user={user}
          editReview={editReview}
          isEditing={editingId === review.id}
          setEditReview={setEditReview}
          onEditClick={() => {
            setEditingId(review.id);
            setEditReview({
              ratings: review.ratings,
              comment: review.comment,
            });
          }}
          onCancelEdit={() => setEditingId(null)}
          onSaveEdit={handleUpdateReview}
        />
      ))}
    </div>
  );
};

export default ReviewList;
