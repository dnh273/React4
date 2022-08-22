// redux có 2 loại action:
// Loại 1: action => object (action thường)
// Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)

import Axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  ADD_TASK_API,
  DEL_TASK_API,
  DONE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  REJECT_TASK_API,
} from "../constants/ToDoListConstant";
import { toDoListService } from "../../services/ToDoListSevice";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

/*
    22/08/2022 Huy viết chức năng getTask
    Action lấy danh sách task từ api    
*/

function* getTaskApiAction(action) {
  // put giống dispatch action
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    let { data, status } = yield call(toDoListService.getTaskApi);

    yield delay(500);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err");
  }

  yield put({
    type: HIDE_LOADING,
  });
  // Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

function* addTaskApiAction(action) {
  // Goị API

  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(action.taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
  // Hiện thị loading

  // Thành công load lại taskList gọi lại action sage load taskList
}

export function* theodoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

function* delTaskApiAction(action) {
  // Gọi API
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.delTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      //  Nếu thành công thì gọi lại action GET_TASKLIST_API
      // (action sage thực thi)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theodoiActionDelTaskApi() {
  yield takeLatest(DEL_TASK_API, delTaskApiAction);
}
function* doneTaskApiAction(action) {
  // Gọi API
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.doneTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      //  Nếu thành công thì gọi lại action GET_TASKLIST_API
      // (action sage thực thi)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function* theodoiActionDoneTaskApi() {
  yield takeLatest(DONE_TASK_API, doneTaskApiAction);
}
function* rejectTaskApiAction(action) {
  // Gọi API

  const { taskName } = action;
  console.log(action);
  try {
    const { data, status } = yield call(() => {
      return toDoListService.rejectTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      //  Nếu thành công thì gọi lại action GET_TASKLIST_API
      // (action sage thực thi)
      yield put({
        type: REJECT_TASK_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export function* theodoiActionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApiAction);
}
