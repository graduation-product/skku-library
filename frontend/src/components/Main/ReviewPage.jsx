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
      <div className="community-nav d-flex">
        <div>
          <button type="button" className="btn-back" onClick={() => back()}>
            <BsChevronLeft
              style={{ marginRight: "7px", marginBottom: "5px" }}
            />
            리뷰
          </button>
        </div>
        <div className="board-name"> 게시판</div>
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
      <div className="article-design">
        <div className="d-flex justify-content-between align-items-end">
          <div id="article-writer">
            <span className="article-info">작성자</span>
          </div>
          <div id="article-writer" style={{ flexGrow: "0.3" }}>
            <span className="article-pubdate">날짜</span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="article-info article-view">
          <span className="hidden"></span>
          <span>조회수</span>
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
