import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
// import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();
  // email을 위한 state
  const [Email, setEmail] = useState("");
  // name을 위한 state
  const [Name, setName] = useState("");
  // password를 위한 state
  const [Password, setPassword] = useState("");
  // confrim를 위한 state
  const [ConfirmPassword, setConfirmPassword] = useState("");

  // input의 내용을 입력할 수 있게
  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    // 새로고침을 막아주기 위해
    event.preventDefault();
    // console.log(`email: ${Email}`);
    // console.log(`password: ${Password}`)

    // 비밀번호 일치 여부

    if(Password !== ConfirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.')
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
      confirmpassword: ConfirmPassword
    };

    dispatch(registerUser(body)).then((response) => {
      if(response.payload.success) {
        props.history.push("/login")
      } else {
        alert("Failed to sign up")
      }
    });
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default RegisterPage;

