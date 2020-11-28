import React, { Component } from 'react';
import axios from 'axios';

const Category = props => (
  <option>{props.category.category_name}</option>
);

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
    this.onChangeTodoCategory = this.onChangeTodoCategory.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
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
    axios.get('http://localhost:4018/newbie-project/todos/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              todo_description: response.data.todo_description,
              todo_date: response.data.todo_date.substring(0, 10),
              todo_category: response.data.todo_category,
              todo_completed: response.data.todo_completed
            });
          })
          .catch(error => {
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

  onChangeTodoDescription(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_description: e.target.value
    }));
  }

  onChangeTodoDate(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_date: e.target.value
    }));
  }

  onChangeTodoCategory(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_category: e.target.value
    }));
  }

  onChangeTodoCompleted(e) {
    this.setState(prevState => ({
      ...prevState,
      todo_completed: !this.state.todo_completed
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      todo_description: this.state.todo_description,
      todo_date: this.state.todo_date,
      todo_category: this.state.todo_category,
      todo_completed: this.state.todo_completed
    };

    axios.post('http://localhost:4018/newbie-project/todos/edit/'+this.props.match.params.id, obj)
          .then(res => {
            console.log(res.data)
            this.props.history.push('/todos');
          });
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
          <h3>Update Todo</h3>
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
                      value={this.state.todo_category}
                      onChange={this.onChangeTodoCategory}
                      >
                <option disabled hidden> -- Select a category -- </option>
                { this.categoryList() }
              </select>
            </div>
            <div className="form-check">
              <input className="form-check-input"
                      id="completedCheckbox"
                      type="checkbox"
                      name="completedCheckbox"
                      onChange={this.onChangeTodoCompleted}
                      checked={this.state.todo_completed}
                      value={this.state.todo_completed}
                      />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
              </label>
            </div>
            <br/>
            <div className="form-group">
              <input type="submit" value="Update Todo" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
