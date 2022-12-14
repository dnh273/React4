import { GET_TASK_API } from "../constants/ToDoListConstant";

const initialState = {
  taskList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_API: {
      console.log("action", action);
      state.taskList = action.taskList;
      return { ...state };
    }

    default:
      return state;
  }
};
