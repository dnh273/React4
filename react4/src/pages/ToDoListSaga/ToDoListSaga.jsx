import React, { useEffect, useState } from "react";
import Axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TASK_API,
  DEL_TASK_API,
  DONE_TASK_API,
  GET_TASKLIST_API,
  REJECT_TASK_API,
} from "../../redux/constants/ToDoListConstant";

export default function ToDoListSaga() {
  const dispatch = useDispatch();

  const { taskList } = useSelector((state) => state.ToDoListReducer);

  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  useEffect(() => {
    // Gọi hàm getTaskList
    getTaskList();

    return () => {};
  }, []);

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

  const getTaskList = () => {
    // Dispatch action saga
    dispatch({
      type: GET_TASKLIST_API,
      data: "abc",
    });
  };

  const addTask = (e) => {
    e.preventDefault(); // Dừng sự kiện submit
    dispatch({
      type: ADD_TASK_API,
      taskName: state.values.taskName,
    });
  };
  //   Hàm xử lý xoá task
  const delTask = (taskName) => {
    dispatch({
      type: DEL_TASK_API,
      taskName: taskName,
    });
  };

  //   Hàm xử lý done task
  const doneTask = (taskName) => {
    dispatch({
      type: DONE_TASK_API,
      taskName: taskName,
    });
  };

  //   Hàm xử lý reject task
  const rejectTask = (taskName) => {
    dispatch({
      type: REJECT_TASK_API,
      taskName: taskName,
    });
  };

  console.log(state);

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
      <button
        onClick={() => {
          dispatch({
            type: "getTaskApiAction",
          });
        }}
        className="btn btn-success"
      >
        Dispatch action saga GetTaskList
      </button>
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
