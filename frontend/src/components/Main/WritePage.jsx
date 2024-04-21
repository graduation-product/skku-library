import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import {
  BsThreeDotsVertical,
  BsChevronLeft,
  BsPencilFill,
  BsTrash,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { PiPencilLineBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import { EditorModules } from "./editor";
import axios from "axios";
import "../../styles/main.css";

function ReviewPage() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/review/");
  };
  const [review, setReview] = useState([]);
  const [title, setTitle] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [content, setContent] = useState("");
  const loginId = "1";
  const server_url = process.env.REACT_APP_SERVER_URL;

  const onClickWrite = async () => {
    if (title !== "" && bookTitle !== "" && content !== "") {
      const postUrl = server_url + "/reviews/register";
      await axios.post(postUrl, {
        author: loginId,
        title: title,
        book_title: bookTitle,
        content: content,
      });
      navigate("/review/");
    } else {
      alert("모든 내용을 입력해주세요");
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBookTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e);
  };

  return (
    <div className="col-9 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <button type="button" className="btn-back" onClick={() => back()}>
          <BsChevronLeft style={{ marginRight: "7px", marginBottom: "5px" }} />
          후기
        </button>
        <div>
          <Button
            variant="outline-success"
            className="mb-1"
            onClick={() => onClickWrite()}
          >
            <PiPencilLineBold className="me-2" />
            작성하기
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center py-3">
        <div className="col-3 me-3">
          <input
            type="text"
            id="article-title"
            name="title"
            className="form-control"
            value={bookTitle}
            placeholder="책 제목을 입력해주세요"
            autoFocus
            onChange={handleBookTitleChange}
          />
        </div>

        <input
          type="text"
          id="article-title"
          name="title"
          className="form-control"
          value={title}
          placeholder="후기 제목을 입력해 주세요"
          autoFocus
          onChange={handleTitleChange}
        />
      </div>
      <div className="divider mb-3" />
      <div className="d-flex flex-column">
        <div>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={EditorModules}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
