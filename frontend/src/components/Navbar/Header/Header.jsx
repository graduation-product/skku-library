import { Link } from "react-router-dom";
import HeaderNavBar from "./HeadNavBar";

function Header() {
  return (
    <header>
      <div className="container d-flex position-relative header">
        <div className="head-of-header d-flex flex-row">
          <Link className="logo">
            <img
              className="invert-color"
              width="42px"
              height="42px"
              src="/images/logo-simple.svg"
              alt="로고"
            />
            <div className="siteTitle fs-3">SKKU SOSD</div>
          </Link>
          <div className="col-lg-9 col-11 d-flex justify-content-end">
            <div className="on-desktop justify-content-between flex-grow-1 gap-3">
              <HeaderNavBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
