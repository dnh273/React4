import React, { useState } from "react";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({ userName: "", passWord: "" });

  console.log(userLogin);
  console.log(props);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
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
    </form>
  );
}
