import React from "react";
import { useDispatch } from "react-redux";
import SlideDown from "../../HOC/Modal/SlideDown";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function DemoHOCModal() {
  // Cach 1 : Nơi định nghĩa mà trả về JSX thì chỉ cần bliding ra là được
  // const LoginWithSlideDown = new SlideDown(Register);
  // Cach 2 : Nếu muốn trả về dạng thẻ <LoginWithSlideDown/> thì nơi định nghĩa phải là dạng function
  const LoginWithSlideDown = function () {
    return new SlideDown(Register);
  };
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Login />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng nhập
      </button>

      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Register />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng ký
      </button>
      {/* Cach 1 */}
      {/* {LoginWithSlideDown} */}
      {/* Cach 2 */}
      <LoginWithSlideDown></LoginWithSlideDown>
    </div>
  );
}
