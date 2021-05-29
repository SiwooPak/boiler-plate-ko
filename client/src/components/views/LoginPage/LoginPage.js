import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

function LoginPage() {
  const dispatch = useDispatch();
  // email을 위한 state
  const [Email, setEmail] = useState("");
  // password를 위한 state
  const [Password, setPassword] = useState("");

  // input의 내용을 입력할 수 있게
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 새로고침을 막아주기 위해
    event.preventDefault();
    console.log(`email: ${Email}`);
    console.log(`password: ${Password}`)
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
