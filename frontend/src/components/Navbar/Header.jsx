import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { GiWhiteBook } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const pathName = location.pathname;
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(pathName);
  }, [pathName]);
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
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            style={{ flex: 2 }}
          >
            <Link style={{ textDecoration: "none" }} to={"/rank"}>
              {path === "/rank" ? (
                <div className="fs-3 text-secondary fw-bold">도서 랭킹</div>
              ) : (
                <div className="fs-3 text-white">도서 랭킹</div>
              )}
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/recommend"}>
              {path === "/recommend" ? (
                <div className="fs-3 text-secondary fw-bold">도서 추천</div>
              ) : (
                <div className="fs-3 text-white">도서 추천</div>
              )}
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/review"}>
              {path === "/review" ? (
                <div className="fs-3 text-secondary fw-bold">도서 후기</div>
              ) : (
                <div className="fs-3 text-white">도서 후기</div>
              )}
            </Link>
          </div>
          <Link
            style={{ textDecoration: "none", flex: 1 }}
            to={"/user"}
            className="d-flex justify-content-end"
          >
            <FiUser size={30} color="white" />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
