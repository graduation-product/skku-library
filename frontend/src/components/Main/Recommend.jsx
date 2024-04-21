import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Recommend() {
  const [book, setBook] = useState(null);
  const [bookTags, setBookTags] = useState(null);
  const navigate = useNavigate();
  const handleClick = (BOOK_URL) => {
    navigate("/book/", {
      state: {
        url: BOOK_URL,
      },
    });
  };

  const [isLogin, setIsLogin] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [sort, setSort] = useState();

  const server_url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) {
      setIsLogin(true);
      setLoginId(sessionStorage.getItem("id"));
    } else {
      alert("로그인 후 이용가능 합니다.");
      navigate(`/login`);
    }
    const recommendBook = async (loginId) => {
      const postUrl = server_url + "/books/recommend";
      try {
        const response = await axios.post(postUrl, { user_id: loginId });
        if (response.status === 200) {
          setBook(response.data);
          console.log(response.data);
          setBookTags([...new Set(response.data.map((bk) => bk.BOOK_TAG))]);
        }
      } catch (error) {}
    };
    if (loginId !== null) {
      recommendBook(loginId);
    }
  }, [loginId]);

  useEffect(() => {
    if (bookTags !== null) {
      setSort(bookTags[0]);
    }
  }, [bookTags]);

  return (
    <>
      {book && bookTags && (
        <div className="col-9 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <span className="fs-3 me-3">금일 추천 도서</span>
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title={sort}
                variant="secondary"
              >
                {bookTags.map((tag) => (
                  <Dropdown.Item key={tag} onClick={() => setSort(tag)}>
                    {tag}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
          <>
            {book
              .filter((book) => book.BOOK_TAG === sort)
              .map((filteredBook) => (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  key={filteredBook.BOOK_ID}
                >
                  <span className="fs-5 mb-3">{filteredBook.BOOK_NAME}</span>
                  <img
                    src={filteredBook.BOOK_IMAGE}
                    alt="이미지"
                    width="300"
                    height="300"
                  />
                  <span className="fs-6 my-3">{filteredBook.BOOK_AUTHOR}</span>
                  <Button
                    variant="outline-success"
                    onClick={() => handleClick(filteredBook.BOOK_URL)}
                  >
                    자세히 보기
                  </Button>
                </div>
              ))}
          </>
        </div>
      )}
    </>
  );
}
export default Recommend;
