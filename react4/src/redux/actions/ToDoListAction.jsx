import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstant";


// 

export const getTaskListApi = () => {
  // Tiền xử lý dữ liệu => xử lý function
  return (dispatch) => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      console.log("result", result.data);
      //   Nếu gọi API lấy về kết quả thành công
      // => set lại state của component
      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });
      console.log("thành công");
    });
    promise.catch((err) => {
      console.log("thất bại");
      console.log("err", err.response.data);
    });
  };
};

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    // Xử lý trước khi dispatch
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    });
    // Xử lý thành công
    promise.then((result) => {
      //   console.log(result.data);
      //   alert(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((err) => {
      console.log(err.response.data);
      alert(err.response.data);
    });
  };
};

export const delTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      console.log(result.data);
      // Sau khi thực hiện api gọi phương thức dispatchAction getTaskListApi để load lại task
      dispatch(getTaskListApi());
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
};

export const doneTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
      alert(errors.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      console.log(result.data);
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
      alert(errors.response.data);
    });
  };
};
