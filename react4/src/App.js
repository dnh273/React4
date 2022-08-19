import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from "./components/Home/Header/Header";
import Profile from "./components/Profile/Profile";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/detail/:id' component={Detail}></Route>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route path='*' component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
