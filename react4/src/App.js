import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
