import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstant";

// Action có 2 loại
// Action thực thi làm thay đổi reducer (action 1)
// Action thực thi xử lỷ rồi mới gọi action 1 thực thi (async action  )

export const getTaskListApi = () => {
  // Tiền xử lý dữ liệu => xử lý function
  return async (dispatch) => {
    try {
      let { data, status, ...res } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data,
        });
      }
    } catch (err) {
      console.log("err", err.response);
    }
    // promise.then((result) => {
    //   console.log("result", result.data);
    //   Nếu gọi API lấy về kết quả thành công
    // => set lại state của component
    //   dispatch({
    //     type: GET_TASK_API,
    //     taskList: result.data,
    //   });
    //   console.log("thành công");
    // });
    // promise.catch((err) => {
    //   console.log("thất bại");
    //   console.log("err", err.response.data);
    // });
  };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    // Xử lý trước khi dispatch
    try {
      let { data, status, ...res } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: { taskName: taskName },
      });
      if (status === 200) {
        dispatch(getTaskListApi());
      }
    } catch (err) {
      console.log(err);
    }
    // // Xử lý thành công
    // promise.then((result) => {
    //   //   console.log(result.data);
    //   //   alert(result.data);
    //   dispatch(getTaskListApi());
    // });

    // promise.catch((err) => {
    //   console.log(err.response.data);
    //   alert(err.response.data);
    // });
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
