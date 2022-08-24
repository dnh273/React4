import { all, call } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import { theoDoiActionGetTaskApi } from "./ToDoListSaga";
import * as Cyberbugs from "./CyberBugs/UserCyberBugSaga";

export function* rootSage() {
  yield all([
    // Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theodoiActionAddTaskApi(),
    ToDoListSaga.theodoiActionDelTaskApi(),
    ToDoListSaga.theodoiActionDoneTaskApi(),
    ToDoListSaga.theodoiActionRejectTaskApi(),

    // Nghiệp ...
    Cyberbugs.theoDoiSignin(),
  ]);
}
