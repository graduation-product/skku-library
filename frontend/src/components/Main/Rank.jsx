import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rank() {
  const [sort, setSort] = useState("전체");
  const [bookList, setBookList] = useState([]);
  const [bookTags, setBookTags] = useState(null);
  const server_url = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    const getBookList = async () => {
      const postUrl = server_url + "/books/ranking";
      try {
        const response = await axios.post(postUrl, { tag: "전체" });
        if (response.status === 200) {
          setBookList(response.data);
          const bookTags = [...new Set(response.data.map((bk) => bk.BOOK_TAG))];
          bookTags.unshift("전체");
          setBookTags(bookTags);
        }
      } catch (error) {}
    };
    getBookList();
  }, []);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/book/" + id);
  };

  return (
    <>
      {bookList && bookTags && (
        <div className="col-9 d-flex flex-column">
          <div className="d-flex justify-content-between mb-3">
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
          {sort === "전체" ? (
            <ListGroup as="ol" numbered>
              {bookList.map((book) => (
                <ListGroup.Item
                  key={book.BOOK_ID}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  onClick={() => handleClick(book.BOOK_ID)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{book.BOOK_NAME}</div>
                    <div>{book.BOOK_AUTHOR}</div>
                  </div>
                  <Badge bg="primary" pill>
                    {book.BOOK_BORROWED}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <ListGroup as="ol" numbered>
              {bookList
                .filter((book) => book.BOOK_TAG === sort)
                .map((book) => (
                  <ListGroup.Item
                    key={book.BOOK_ID}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    onClick={() => handleClick(book.BOOK_ID)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{book.BOOK_NAME}</div>
                      <div>{book.BOOK_AUTHOR}</div>
                    </div>
                    <Badge bg="primary" pill>
                      {book.BOOK_BORROWED}
                    </Badge>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </div>
      )}
    </>
  );
}
export default Rank;
