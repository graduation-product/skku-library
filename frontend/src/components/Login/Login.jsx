import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const onClickLogin = () => {
    console.log("click login");
  };
  return (
    <div className="w-100 h-100 d-flex flex-column justify-items-center align-items-center">
      <h2 className="mb-4">Login</h2>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={inputId}
          onChange={handleInputId}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="password"
          name="input_pw"
          value={inputPw}
          onChange={handleInputPw}
        />
      </div>
      <Button
        variant="outline-success"
        className="my-4"
        onClick={() => onClickLogin()}
      >
        로그인
      </Button>
    </div>
  );
}

export default Login;
