import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/rank");
  }, []);
  return <div className="col-9 d-flex justify-content-center"></div>;
}
export default Main;
