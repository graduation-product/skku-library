import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

function Rank() {
  const [sort, setSort] = useState("종합");
  return (
    <div className="col-9 d-flex flex-column">
      <div className="d-flex justify-content-between mb-3">
        <DropdownButton
          id="dropdown-basic-button"
          title={sort}
          variant="secondary"
        >
          <Dropdown.Item onClick={() => setSort("종합")}>종합</Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("컴퓨터")}>
            컴퓨터
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("자연과학")}>
            자연과학
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Cras justo odio
          </div>
          <Badge bg="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
export default Rank;
