import { BsFillHandThumbsUpFill, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Review() {
  const navigate = useNavigate();
  const onReview = (id) => {
    navigate(`/review/${id}`);
  };
  return (
    <div className="col-9 d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 p-4 d-flex align-items-center border-bottom">
        <h4
          style={{ flex: 7, cursor: "pointer" }}
          onClick={() => onReview(1)}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          제목
        </h4>
        <div className="d-flex justify-content-center" style={{ flex: 2 }}>
          작성자
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-end"
          style={{ flex: 1 }}
        >
          <div>날짜</div>
          <div className="d-flex align-items-center">
            <BsFillHandThumbsUpFill />
            <span className="mx-1">20</span>
            <BsEyeFill />
            <span className="mx-1">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Review;

// .board-article-title:hover {
//   text-decoration: underline;
//   cursor: pointer;
// }
