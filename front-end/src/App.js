import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import FrontPage from "./components/front-page";
import TodosPage from "./components/todos-page";
import AccountsPage from "./components/accounts-page";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">SPARCS Newbie Project</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/todos" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/accounts" className="nav-link">Accounts</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

          <div className="container">
            <Route path="/" exact component={FrontPage} />
            <Route path="/todos" component={TodosPage} />
            <Route path="/accounts" component={AccountsPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
