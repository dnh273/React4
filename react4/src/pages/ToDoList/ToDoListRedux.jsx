import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskApi,
  delTaskApi,
  doneTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";

export default function ToDoListRedux(props) {
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  let dispatch = useDispatch();

  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  const renderTaskToDo = () => {
    return taskList
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
    return taskList
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
    dispatch(delTaskApi(taskName));
  };

  //   Hàm xử lý done task
  const doneTask = (taskName) => {
    dispatch(doneTaskApi(taskName));
  };

  //   Hàm xử lý reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  const addTask = (e) => {
    e.preventDefault(); // Dừng sự kiện submit
    console.log(state.values.taskName);

    // Xử lý nhận dữ liệu từ người đăng nhập => gọi action addTaskApi()
    dispatch(addTaskApi(state.values.taskName));
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
