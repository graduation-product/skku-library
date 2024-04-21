import { BsFillHandThumbsUpFill, BsEyeFill } from "react-icons/bs";
import { PiPencilLineBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Review() {
  const navigate = useNavigate();
  const onReview = (id) => {
    navigate(`/review/${id}`);
  };
  const [reviewList, setReviewList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loginId, setLoginId] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) {
      setIsLogin(true);
      setLoginId(sessionStorage.getItem("id"));
    }
  }, []);

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

  const onClickWrite = () => {
    if (isLogin) {
      navigate(`/write`, {
        state: {
          loginId: loginId,
        },
      });
    } else {
      alert("로그인 시 이용가능 합니다.");
      navigate(`/login`);
    }
  };

  return (
    <div className="col-9 d-flex flex-column align-items-center justify-content-center">
      <div>
        <Button
          variant="outline-success"
          className="mb-1"
          onClick={() => onClickWrite()}
        >
          <PiPencilLineBold className="me-2" />
          후기 작성하기
        </Button>
      </div>
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
