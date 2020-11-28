import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {

  constructor(props) {
    super(props);

    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      category_name: "",
      category_selected: true
    }
  }

  onChangeCategoryName(e) {
    this.setState(prevState => ({
      ...prevState,
      category_name: e.target.value
    }))
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Category created:`);
    console.log(`Category Name: ${this.state.category_name}`);

    const newCategory = {
      category_name: this.state.category_name,
      category_selected: this.state.category_selected
    };

    axios.post('http://localhost:4018/newbie-project/categories/create', newCategory)
          .then(res => {
            console.log(res.data)
            this.props.history.push('/todos');
          });

    this.setState({
      category_name: "",
      category_selected: true
    })

    window.location.reload(true);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSubmit}>
        <div>
          <input type="text"
                  className="form-control col-sm-8 col-form-label-sm"
                  value={this.state.category_name}
                  onChange={this.onChangeCategoryName}
                  />
          <input type="submit"
                  value="Add"
                  className="btn btn-primary btn btn-primary btn-sm"
                  style={{marginLeft: 10}}
                  />
        </div>
      </form>
    )
  }
}
