import { all, call } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import { theoDoiActionGetTaskApi } from "./ToDoListSaga";

export function* rootSage() {
  yield all([
    // Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    // Nghiệp vụ ....
    ToDoListSaga.theodoiActionAddTaskApi(),
    // Nghiệp vụ .
    ToDoListSaga.theodoiActionDelTaskApi(),
    ToDoListSaga.theodoiActionDoneTaskApi(),
    ToDoListSaga.theodoiActionRejectTaskApi(),
  ]);
}
