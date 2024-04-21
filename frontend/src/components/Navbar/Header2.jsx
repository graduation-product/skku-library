import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { GiWhiteBook } from "react-icons/gi";

function Header2() {
  return (
    <header>
      <div className="col-12 p-4 bg-success bg-opacity-50 text-white d-flex justify-content-center align-items-center">
        <div className="col-9 d-flex flex-row justify-content-between align-items-center">
          <Link
            className="d-flex flex-row align-items-center"
            style={{ textDecoration: "none", flex: 1 }}
            to={"/"}
          >
            <GiWhiteBook size={30} color="white" className="me-1" />
            <div className="fs-3 text-white">SKKU Library</div>
          </Link>
          <Link
            style={{ textDecoration: "none", flex: 1 }}
            to={"/login"}
            className="d-flex justify-content-end"
          >
            <FiUser size={30} color="white" />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header2;
