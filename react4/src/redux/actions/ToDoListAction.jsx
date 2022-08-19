import { GET_TASK_API } from "../constants/ToDoListConstant";

export const getTaskAction = (taskName) => ({
  type: GET_TASK_API,
  taskName,
});
