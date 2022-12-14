import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    passWord: "",
    status: false,
  });

  console.log(userLogin);
  console.log(props);
  const handleChange = (event) => {
    const { name, value } = event.target;

    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };

    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status")
        if (newUserLogin[key].trim() === "") {
          valid = false;
        }
    }

    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }
    setUserLogin(newUserLogin);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (userLogin.userName === "Dark" && userLogin.passWord === "yeuly2k") {
      // Thành công thì chuyển về trang trước đó
      //   props.history.goBack();
      // Chuyển đến trang chỉ định go xử lý
      //   Chuyển hướng đến path tương ứng
      //   props.history.push("./home");
      //   Replace thay đổi nội dung
      //   props.history.replace("./home");
      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Login fail");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="container">
        <h3 className="display-4">Dark</h3>
        <div className="form-group">
          <p>User Name</p>
          <input
            name="userName"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <p>Password</p>
          <input
            name="passWord"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Login</button>
        </div>
      </div>
      <Prompt
        when={userLogin.status}
        message={(location) => {
          console.log("location", location);
          return "Bạn có muốn rời trang này?";
        }}
      />
    </form>
  );
}
