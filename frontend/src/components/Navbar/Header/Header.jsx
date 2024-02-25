import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { GiHamburgerMenu, GiWhiteBook } from "react-icons/gi";

function Header() {
  return (
    <header>
      <div className="w-100 p-4 mb-2 bg-success bg-opacity-50 text-white d-flex justify-content-between align-items-center">
        <GiHamburgerMenu size={30} style={{ cursor: "pointer" }} />
        <Link
          className="d-flex flex-row align-items-center"
          style={{ textDecoration: "none" }}
          to={"/"}
        >
          <GiWhiteBook size={30} color="white" className="me-1" />
          <div className="fs-3 text-white">SKKU Library</div>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/user"}>
          <FiUser size={30} color="white" />
        </Link>
      </div>
    </header>
  );
}
export default Header;
