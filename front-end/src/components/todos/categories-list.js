import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import CreateCategory from "./create-category";

const Category = props => {
  return(
    <div>
      <input id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={props.onChange}
              checked={props.category.category_selected}
              value={props.category.category_selected}
              /> {props.category.category_name}
    </div>
  )
};

export default class CategoriesList extends Component {

  constructor(props) {
    super(props);

    this.onChangeCategorySelected = this.onChangeCategorySelected.bind(this);

    this.state = {
      categories: [],
    };
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

  onChangeCategorySelected = (index) => (
    (e) => {
      // e.preventDefault();
      this.setState(prevState => ({
        ...prevState,
        categories: prevState.categories.map(
          (category, idx) => {
            return idx !== index ? category : ({ ...category, category_selected: !category.category_selected })
          }
        )
      }))

      this.state.categories.map(
        (category, idx) => {
          if(idx === index) {
            axios.post('http://localhost:4018/newbie-project/categories/edit/'+category._id, category)
                  .then(res => {
                    console.log(res.data)
                    this.props.history.push('/todos');
                  });
          }
        }
      )
      window.location.reload(true);
    }
  )

  categoryList() {
    return this.state.categories.map((currentCategory, index) => {
      return <Category category={currentCategory}
                        onChange={this.onChangeCategorySelected(index)}
                        key={index}
                        />
    })
  }

  render() {
    return (
      <div>
        <h4>Categories</h4>
        <div style={{marginLeft: 10, lineHeight: 2.5}}>
          { this.categoryList() }
          <Router>
            <Route component={CreateCategory} />
          </Router>
        </div>
      </div>
    )
  }
}
