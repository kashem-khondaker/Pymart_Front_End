import React from 'react';
import ReviewCart from './ReviewCart';

const ReviewList = ({ reviews }) => {
    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewCart key={review.id} review={review} />
            ))}
        </div>
    );
};

export default ReviewList;
