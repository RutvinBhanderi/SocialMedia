import React from "react";
import "./App.css";
import Home from "./componants/Home/Home";
import Navbar from "./componants/Navbar/Navbar";
import AuthForm from "./componants/Auth/AuthForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostDetail from "./componants/PostDetail/PostDetail";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetail} />
          <Route
            path='/auth'
            exact
            component={() => (!user ? <AuthForm /> : <Redirect to='/posts' />)}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
