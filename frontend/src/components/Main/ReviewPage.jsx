import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {
  BsThreeDotsVertical,
  BsChevronLeft,
  BsPencilFill,
  BsTrash,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/main.css";

function ReviewPage() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/review/");
  };
  const { reviewid } = useParams();
  const [review, setReview] = useState([]);
  const server_url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getReview = async () => {
      const postUrl = server_url + "/reviews/detail";
      try {
        const response = await axios.post(postUrl, { review_id: reviewid });
        if (response.status === 200) {
          console.log(response.data);
          setReview(response.data);
        }
      } catch (error) {}
    };
    getReview();
  }, []);

  return (
    <>
      {review && (
        <div className="col-9 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center pb-4">
            <div>
              <button type="button" className="btn-back" onClick={() => back()}>
                <BsChevronLeft
                  style={{ marginRight: "7px", marginBottom: "5px" }}
                />
                후기
              </button>
            </div>
            <div className="fs-3 fw-bold">
              [{review.REVIEW_BOOK_TITLE}] {review.REVIEW_TITLE}
            </div>
            <div>
              <button
                type="button"
                className="btn-back"
                style={{ visibility: "hidden" }}
              >
                <BsChevronLeft
                  style={{ marginRight: "7px", marginBottom: "5px" }}
                />
                후기
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-end align-items-center py-2">
              <span className="fs-6 pe-2">{review.REVIEW_AUTHOR_NAME}</span>
              {review.REVIEW_DATE && (
                <span className="fs-6 pe-2">
                  {review.REVIEW_DATE.slice(0, 10)}
                </span>
              )}
            </div>
            <div className="article-body">{review.REVIEW_CONTENT}</div>
            <div className="article-bottom-list">
              <div className="d-flex gap-3">
                <div id="like-icon" style={{ cursor: "pointer" }}>
                  <span>
                    {1 ? <FaThumbsUp size={25} /> : <FaRegThumbsUp size={25} />}
                  </span>
                  <span>좋아요</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewPage;
