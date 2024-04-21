import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rank() {
  const [sort, setSort] = useState("none");
  const [bookList, setBookList] = useState([]);
  const server_url = process.env.REACT_APP_SERVER_URL;
  useEffect(() => {
    const orderRanking = async (sort) => {
      const postUrl = server_url + "/books/ranking";
      try {
        const response = await axios.post(postUrl, { tag: sort });
        if (response.status === 200) {
          console.log(response.data);
          setBookList(response.data);
        }
      } catch (error) {}
    };
    orderRanking(sort);
  }, [sort]);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/book/" + id);
  };

  return (
    <div className="col-9 d-flex flex-column">
      <div className="d-flex justify-content-between mb-3">
        <DropdownButton
          id="dropdown-basic-button"
          title={sort}
          variant="secondary"
        >
          <Dropdown.Item onClick={() => setSort("전체")}>종합</Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("컴퓨터")}>
            컴퓨터
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("자연과학")}>
            자연과학
          </Dropdown.Item>
        </DropdownButton>
      </div>
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
    </div>
  );
}
export default Rank;
