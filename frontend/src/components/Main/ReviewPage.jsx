import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {
  BsThreeDotsVertical,
  BsChevronLeft,
  BsPencilFill,
  BsTrash,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

function ReviewPage() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/review/");
  };
  return (
    <div className="col-9 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center pb-4">
        <div>
          <button type="button" className="btn-back" onClick={() => back()}>
            <BsChevronLeft
              style={{ marginRight: "7px", marginBottom: "5px" }}
            />
            리뷰
          </button>
        </div>
        <div className="fs-3 fw-bold"> 게시판</div>
        <div>
          <button
            type="button"
            className="btn-back"
            style={{ visibility: "hidden" }}
          >
            <BsChevronLeft
              style={{ marginRight: "7px", marginBottom: "5px" }}
            />
            리뷰
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-end align-items-center py-2">
          <span className="fs-6 pe-2">작성자</span>
          <span className="fs-6 pe-2">날짜</span>
        </div>
        <div className="article-body">
          글
          {/* <span
            dangerouslySetInnerHTML={{ __html: article.body }}
            className="article-info"
          ></span> */}
        </div>
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
  );
}

export default ReviewPage;
