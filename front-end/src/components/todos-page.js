import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateTodo from "./todos/create-todo";
import EditTodo from "./todos/edit-todo";
import TodosList from "./todos/todos-list";

export default class TodosPage extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/todos" exact component={TodosList} />
          <Route path="/todos/edit/:id" component={EditTodo} />
          <Route path="/todos/create" component={CreateTodo} />
        </div>
      </Router>
    )
  }
}
