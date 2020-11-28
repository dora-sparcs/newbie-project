import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

import CategoriesList from "./categories-list";

var Category = [];

const Todo = props => (
  <tr className={Category.indexOf(props.todo.todo_category)!== -1 ? 'chosen' : 'unchosen'}>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_date != null ? props.todo.todo_date.substring(0, 10) : ""}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_category}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      <Link to={"todos/edit/"+props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      categories: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4018/newbie-project/todos')
          .then(response => {
            this.setState(prevState => ({
              ...prevState,
              todos: response.data
            }))
          })
          .catch(function(error){
            console.log(error);
          });
    axios.get('http://localhost:4018/newbie-project/categories')
          .then(response => {
            this.setState(prevState => ({
              ...prevState,
              categories: response.data
            }))
          })
          .catch(function(error){
            console.log(error);
          });
  }

  todoList() {
    Category = this.state.categories.map(function(currentCategory, i){
      return currentCategory.category_selected ? currentCategory.category_name : null;
    });

    return this.state.todos.map(function(currentTodo, i){
      return <Todo todo={currentTodo} key={i} />;
    }).sort((todo1, todo2) => {
      const todo_completed1 = todo1.props.todo.todo_completed
      const todo_completed2 = todo2.props.todo.todo_completed
      if(todo_completed1 > todo_completed2) return 1;
      if(todo_completed1 < todo_completed2) return -1;
      const todo_date1 = todo1.props.todo.todo_date
      const todo_date2 = todo2.props.todo.todo_date
      return todo_date1.localeCompare(todo_date2);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <h3>Todos List </h3>
          <Link to="/todos/create">+ Add Todo</Link>
          <table className="table" style={{ marginTop: 20 }} >
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { this.todoList() }
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <br/><br/>
          <Router>
            <Route component={CategoriesList} />
          </Router>
        </div>
      </div>
    )
  }
}
