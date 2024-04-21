import { BsFillHandThumbsUpFill, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Review() {
  const navigate = useNavigate();
  const onReview = (id) => {
    navigate(`/review/${id}`);
  };
  const [reviewList, setReviewList] = useState([]);

  const server_url = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    const getReviewList = async () => {
      const postUrl = server_url + "/reviews/list";
      try {
        const response = await axios.post(postUrl);
        if (response.status === 200) {
          console.log(response.data);
          setReviewList(response.data);
        }
      } catch (error) {}
    };
    getReviewList();
  }, []);

  return (
    <div className="col-9 d-flex flex-column align-items-center justify-content-center">
      {reviewList.map((review, idx) => (
        <div
          className="w-100 p-4 d-flex align-items-center border-bottom"
          key={idx}
        >
          <h4
            style={{ flex: 7, cursor: "pointer" }}
            onClick={() => onReview(review.REVIEW_ID)}
            onMouseOver={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            [{review.REVIEW_BOOK_TITLE}] {review.REVIEW_TITLE}
          </h4>
          <div className="d-flex justify-content-center" style={{ flex: 2 }}>
            {review.REVIEW_AUTHOR_NAME}
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-end"
            style={{ flex: 1 }}
          >
            <div>{review.REVIEW_DATE.slice(0, 10)}</div>
            <div className="d-flex align-items-center">
              <BsFillHandThumbsUpFill />
              <span className="mx-1">{review.REVIEW_LIKE}</span>
              <BsEyeFill />
              <span className="mx-1">{review.REVIEW_VIEW}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Review;
