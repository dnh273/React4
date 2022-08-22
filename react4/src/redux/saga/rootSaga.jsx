import Axios from "axios";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { GET_TASK_API } from "../constants/ToDoListConstant";
// redux có 2 loại action:
// Loại 1: action => object (action thường)
// Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
function* getTaskApi(action) {
  let { data, status } = yield call(() => {
    return Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
  });

  // Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });
}

export function* rootSage() {
  yield takeLatest("getTaskApiAction", getTaskApi);
}
