import React, { Component } from "react";
// import style from "./ToDoList.css";
import Axios from "axios";

export default class ToDoList extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };

  getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      console.log("result", result.data);
      //   Nếu gọi API lấy về kết quả thành công
      // => set lại state của component
      this.setState({
        taskList: result.data,
      });
      console.log("thành công");
    });
    promise.catch((err) => {
      console.log("thất bại");
      console.log("err", err.response.data);
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
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
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.doneTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskDone = () => {
    return this.state.taskList
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
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.rejectTask(item.taskName);
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
  delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      console.log(result.data);
      this.getTaskList();
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };

  //   Hàm xử lý done task
  doneTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
      alert(errors.response.data);
    });
  };

  //   Hàm xử lý reject task
  rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      console.log(result.data);
      this.getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
      alert(errors.response.data);
    });
  };

  //   Hàm sẽ tự động thực thi sau khi nội dung component được render
  componentDidMount() {
    this.getTaskList();
  }

  handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...this.state.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...this.state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + "is invalid!";
    } else {
      newErrors[name] = "";
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  addTask = (e) => {
    e.preventDefault(); // Dừng sự kiện submit
    console.log(this.state.values.taskName);
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: this.state.values.taskName },
    });
    // Xử lý thành công
    promise.then((result) => {
      //   console.log(result.data);
      //   alert(result.data);
      this.getTaskList();
    });

    promise.catch((err) => {
      console.log(err.response.data);
      alert(err.response.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.addTask}>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task List
        </button> */}
        <div className="card">
          <div className="card__header">
            <img src={require("./bg.png")} alt="" />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
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
                  onChange={this.handleChange}
                  placeholder="Enter an activity..."
                />
                <button id="addItem" onClick={this.addTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <p className="text text-danger">{this.state.errors.taskName}</p>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskDone()}
                  {/* <li>
                    <span>Ăn sáng</span>
                    <div className="buttons">
                      <button className="remove">
                        <i className="fa fa-trash-alt" />
                      </button>
                      <button className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                      </button>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
