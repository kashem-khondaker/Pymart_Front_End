import ReviewForm from './ReviewForm';
import StarRating from './StarRating';

const ReviewSection = () => {
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            <ReviewForm onSubmit={onSubmit}/>
            {/* <StarRating/> */}
        </div>
    );
};

export default ReviewSection;