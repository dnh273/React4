import { fork, take } from "redux-saga/effects";
// redux có 2 loại action:
// Loại 1: action => object (action thường)
// Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
function* getTaskApi() {
  while (true) {
    yield take(); // Theo dõi action xem action nào dispatch mới làm các công việc bên dưới
    console.log("getTaskApi");
    //   call api dispatch lên reducer ...
  }
}

export function* rootSage() {
  console.log("rootSage");

  yield fork(getTaskApi); // non-blocking chạy không cần chờ
}
