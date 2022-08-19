import React from "react";

export default function Detail(props) {
  return (
    <div>
      Giá trị tham số {props.match.params.id}
      <br />
      Props name hiện tại: {props.match.path}
      <br />
      Url hiện tại: {props.match.url}
    </div>
  );
}
