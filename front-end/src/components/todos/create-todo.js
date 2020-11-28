import React, { Component } from 'react';
import axios from 'axios';

const Category = props => (
  <option>{props.category.category_name}</option>
);

export default class CreateTodo extends Component {

  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
    this.onChangeTodoCategory = this.onChangeTodoCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todos: {
        todo_description: "",
        todo_date: "",
        todo_category: "",
        todo_completed: false,
      },
      categories: [],
    }
  }

  componentDidMount() {
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

  onChangeTodoDescription(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_description: e.target.value
    }))
  }

  onChangeTodoDate(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_date: e.target.value
    }))
  }

  onChangeTodoCategory(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_category: e.target.value
    }))
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Date: ${this.state.todo_date}`);
    console.log(`Todo Category: ${this.state.todo_category}`);
    console.log(`Todo Completed: ${this.state.todo_completed}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_date: this.state.todo_date,
      todo_category: this.state.todo_category,
      todo_completed: false
    };

    axios.post('http://localhost:4018/newbie-project/todos/create', newTodo)
          .then(res => {
            console.log(res.data);
            this.props.history.push('/todos');
          });

    this.setState({
      todo_description: "",
      todo_date: "",
      todo_category: "",
      todo_completed: false,
    })
  }

  categoryList() {
    return this.state.categories.map((currentCategory, index) => {
      return <Category category={currentCategory} key={index} />
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <h3>Create New Todo</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Description: </label>
              <input type="text"
                      className="form-control"
                      value={this.state.todo_description}
                      onChange={this.onChangeTodoDescription}
                      />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <input type="date"
                      className="form-control"
                      value={this.state.todo_date}
                      onChange={this.onChangeTodoDate}
                      />
            </div>
            <div className="form-group">
              <label>Category: </label>
              <select className="form-control"
                      onChange={this.onChangeTodoCategory}
                      >
                <option disabled selected value> -- Select a category -- </option>
                { this.categoryList() }
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Create Todo" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
