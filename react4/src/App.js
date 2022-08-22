import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import Profile from "./components/Profile/Profile";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoListSaga from "./pages/ToDoListSaga/ToDoListSaga";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <LoadingComponent></LoadingComponent>
      <Switch>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/detail/:id' component={Detail}></Route>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/todolistrfc' component={ToDoListRFC}></Route>
        <Route exact path='/todolistrcc' component={ToDoList}></Route>
        <Route exact path='/todolistredux' component={ToDoListRedux}></Route>
        <Route exact path='/todolistsaga' component={ToDoListSaga}></Route>
        <Route path='*' component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
