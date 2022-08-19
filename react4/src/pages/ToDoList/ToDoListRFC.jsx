import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function ToDoListRFC() {
  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      console.log("result", result.data);
      //   Nếu gọi API lấy về kết quả thành công
      // => set lại state của component
      setState({
        ...state,
        taskList: result.data,
      });
      console.log("thành công");
    });
    promise.catch((err) => {
      console.log("thất bại");
      console.log("err", err.response.data);
    });
  };

  const renderTaskToDo = () => {
    return state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  doneTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  const renderTaskDone = () => {
    return state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  //   Hàm xử lý xoá task
  const delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      console.log(result.data);
      getTaskList();
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };

  //   Hàm xử lý done task
  const doneTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
      alert(errors.response.data);
    });
  };

  //   Hàm xử lý reject task
  const rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      console.log(result.data);
      getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
      alert(errors.response.data);
    });
  };

  console.log(state);

  const addTask = (e) => {
    e.preventDefault(); // Dừng sự kiện submit
    console.log(state.values.taskName);
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: state.values.taskName },
    });
    // Xử lý thành công
    promise.then((result) => {
      //   console.log(result.data);
      //   alert(result.data);
      getTaskList();
    });

    promise.catch((err) => {
      console.log(err.response.data);
      alert(err.response.data);
    });
  };

  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + "is invalid!";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  useEffect(() => {
    getTaskList();
    return () => {};
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <img src={require("./bg.png")} alt="" />
      </div>
      {/* <h2>hello!</h2> */}
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              name="taskName"
              id="newTask"
              type="text"
              onChange={handleChange}
              placeholder="Enter an activity..."
            />
            <button id="addItem" type="submit" onClick={addTask}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
