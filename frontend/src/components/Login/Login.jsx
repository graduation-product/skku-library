import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const server_url = process.env.REACT_APP_SERVER_URL;

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loginId, setLoginId] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) {
      setIsLogin(true);
      setLoginId(sessionStorage.getItem("id"));
    }
  }, []);
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const onClickLogin = async () => {
    if (inputId !== "" && inputPw !== "") {
      const postUrl = server_url + "/users/login";
      await axios
        .post(postUrl, {
          user_number: inputId,
          password: inputPw,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("id", res.data.user_id);
          window.location.replace("http://localhost:3000/");
        })
        .catch((err) => {
          alert(err);
        });
      alert("로그인 성공");
      navigate("/");
    } else {
      alert("모든 내용을 입력해주세요");
    }
  };

  const onClickLogOut = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {isLogin === false ? (
        <div className="w-100 h-100 d-flex flex-column justify-items-center align-items-center">
          <h2 className="mb-4">Login</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="input_id" style={{ width: "40px" }}>
                ID:
              </label>
              <input
                type="text"
                name="input_id"
                value={inputId}
                onChange={handleInputId}
              />
            </div>
            <div>
              <label htmlFor="input_pw" style={{ width: "40px" }}>
                PW:
              </label>
              <input
                type="password"
                name="input_pw"
                value={inputPw}
                onChange={handleInputPw}
              />
            </div>
          </div>
          <Button
            variant="outline-success"
            className="my-4"
            onClick={() => onClickLogin()}
          >
            로그인
          </Button>
        </div>
      ) : (
        <Button
          variant="outline-success"
          className="my-4"
          onClick={() => onClickLogOut()}
        >
          로그아웃
        </Button>
      )}
    </>
  );
}

export default Login;
