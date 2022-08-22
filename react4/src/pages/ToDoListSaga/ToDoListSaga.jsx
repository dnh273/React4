import React, { useEffect, useState } from "react";
import Axios from "axios";

import { useDispatch } from "react-redux";

export default function ToDoListSaga() {
  const dispatch = useDispatch();

  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const getTaskList = () => {};

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
  const delTask = (taskName) => {};

  //   Hàm xử lý done task
  const doneTask = (taskName) => {};

  //   Hàm xử lý reject task
  const rejectTask = (taskName) => {};

  console.log(state);

  const addTask = (e) => {
    e.preventDefault(); // Dừng sự kiện submit
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
      <button
        onClick={() => {
          dispatch({
            type: "getTaskApi",
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
