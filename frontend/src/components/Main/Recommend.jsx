import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recommend() {
  const [book, setBook] = useState({
    BOOK_AUTHOR: "Bryant, Randal; O'Hallaron, David Richard; 김형신",
    BOOK_BORROWED: 3,
    BOOK_CLASSIFIER: "004 B915c1 2016",
    BOOK_ID: 2,
    BOOK_IMAGE: "https://image.yes24.com/goods/31950404/XL",
    BOOK_ISBN: "9791185475219",
    BOOK_NAME: "컴퓨터시스템",
    BOOK_PUBLISHER: "Pearson",
  });
  const server_url = process.env.REACT_APP_SERVER_URL;
  const searchBook = async (book) => {
    if (book !== "") {
      const postUrl = server_url + "/";
      await axios.post(postUrl, { portfolio: " " });
    }
  };
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/book/" + id);
  };
  return (
    <div className="col-9 d-flex flex-column justify-content-center align-items-center">
      <span className="fs-3 mb-3">금일 추천 도서</span>
      <span className="fs-5 mb-3">{book.BOOK_NAME}</span>
      <img src={book.BOOK_IMAGE} alt="이미지" width="300" height="300" />
      <span className="fs-6 my-3">{book.BOOK_AUTHOR}</span>
      <Button
        variant="outline-success"
        onClick={() => handleClick(book.BOOK_ID)}
      >
        자세히 보기
      </Button>
    </div>
  );
}
export default Recommend;
