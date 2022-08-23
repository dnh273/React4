import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import Profile from "./components/Profile/Profile";
import Modal from "./HOC/Modal/Modal";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoListSaga from "./pages/ToDoListSaga/ToDoListSaga";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

function App() {
  return (
    <BrowserRouter>
      <Modal></Modal>
      <LoadingComponent></LoadingComponent>
      <Switch>
        {/* <Route exact path='/home' render={(propsRoute) => {
          return <div>
            <Header></Header>
            <Home {...propsRoute}></Home>
          </div>
        }}></Route> */}

        <HomeTemplate path='/home' exact Component={Home}></HomeTemplate>
       
        <HomeTemplate exact path='/about' Component={About}></HomeTemplate>
        <HomeTemplate exact path='/contact' Component={Contact}></HomeTemplate>
        <HomeTemplate exact path='/login' Component={Login}></HomeTemplate>
        <HomeTemplate exact path='/detail/:id' Component={Detail}></HomeTemplate>
        <HomeTemplate exact path='/' Component={Home}></HomeTemplate>
        <HomeTemplate exact path='/profile' Component={Profile}></HomeTemplate>
        <HomeTemplate exact path='/todolistrfc' Component={ToDoListRFC}></HomeTemplate>
        <HomeTemplate exact path='/todolistrcc' Component={ToDoList}></HomeTemplate>
        <HomeTemplate exact path='/todolistredux' Component={ToDoListRedux}></HomeTemplate>
        <HomeTemplate exact path='/todolistsaga' Component={ToDoListSaga}></HomeTemplate>
        <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal}></HomeTemplate>
        <HomeTemplate path='*' Component={PageNotFound}></HomeTemplate>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
