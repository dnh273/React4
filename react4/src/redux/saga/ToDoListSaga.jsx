// redux có 2 loại action:
// Loại 1: action => object (action thường)

import Axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_TASK_API } from "../constants/ToDoListConstant";
import { toDoListService } from "../../services/ToDoListSevice";

// Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
function* getTaskApiAction(action) {
  console.log("actionSaga", action);
  let { data, status } = yield call(toDoListService.getTaskApi);

  // Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest("getTaskApiAction", getTaskApiAction);
}
