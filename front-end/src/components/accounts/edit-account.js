import React, { Component } from 'react';
import axios from 'axios';

const Source = ["Card", "Cash", "Bank"];
const Category = ["Food", "Hobby", "Other"];

const date = new Date();
var currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

export default class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeAccountDate = this.onChangeAccountDate.bind(this);
    this.onChangeAccountDescription = this.onChangeAccountDescription.bind(this);
    this.onChangeAccountInOut = this.onChangeAccountInOut.bind(this);
    this.onChangeAccountMoney = this.onChangeAccountMoney.bind(this);
    this.onChangeAccountSource = this.onChangeAccountSource.bind(this);
    this.onChangeAccountCategory = this.onChangeAccountCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      account_date: currentDate,
      account_description: "",
      account_inout: false,
      account_money: "",
      account_source: Source[0],
      account_category: "",
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4018/newbie-project/accounts/'+this.props.match.params.id)
          .then(response => {
            console.log(response)
            this.setState({
              account_date: response.data.account_date,
              account_description: response.data.account_description,
              account_inout: response.data.account_inout,
              account_money: response.data.account_money,
              account_source: response.data.account_source,
              account_category: response.data.account_category,
            });
          })
          .catch(error => {
            console.log(error);
          });
  }

  onChangeAccountDescription(e) {
    this.setState(prevState => ({
      ...prevState,
      account_description: e.target.value
    }));
  }

  onChangeAccountDate(e) {
    this.setState(prevState => ({
      ...prevState,
      account_date: e.target.value
    }))
  }

  onChangeAccountDescription(e) {
    this.setState(prevState => ({
      ...prevState,
      account_description: e.target.value
    }))
  }

  onChangeAccountInOut(e) {
    this.setState(prevState => ({
      ...prevState,
      account_inout: !this.state.account_inout
    }))
  }

  onChangeAccountMoney(e) {
    this.setState(prevState => ({
      ...prevState,
      account_money: e.target.value
    }))
  }

  onChangeAccountSource(e) {
    this.setState(prevState => ({
      ...prevState,
      account_source: e.target.value
    }))
  }

  onChangeAccountCategory(e) {
    this.setState(prevState => ({
      ...prevState,
      account_category: e.target.value
    }))
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      account_date: this.state.account_date,
      account_description: this.state.account_description,
      account_inout: this.state.account_inout,
      account_money: this.state.account_money,
      account_source: this.state.account_source,
      account_category: this.state.account_category,
    };

    axios.post('http://localhost:4018/newbie-project/accounts/edit/'+this.props.match.params.id, obj)
          .then(res => {
            console.log(res.data)
            this.props.history.push('/accounts');
          });
  }

  sourceList() {
    return Source.map(function(currentSource, i){
      return <option>{currentSource}</option>
    })
  }

  categoryList() {
    return Category.map(function(currentCategory, i){
      return <option>{currentCategory}</option>
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>Update Account</h3>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <label>Date: </label>
              <input type="date"
                      className="form-control"
                      value={this.state.account_date.substring(0, 10)}
                      onChange={this.onChangeAccountDate}
                      />
            </div>

            <div className="form-group">
              <label>Description: </label>
              <input type="text"
                      className="form-control"
                      value={this.state.account_description}
                      onChange={this.onChangeAccountDescription}
                      />
            </div>

            <div className="form-group">
              <div className="form-check form-check-inline">
                <input type="radio"
                        className="form-check-input"
                        value="income"
                        name="inlineRadioOptions"
                        onChange={this.onChangeAccountInOut}
                        checked={this.state.account_inout}
                        />
                <label className="form-check-label">Income</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="radio"
                        className="form-check-input"
                        value="outcome"
                        name="inlineRadioOptions"
                        onChange={this.onChangeAccountInOut}
                        checked={!this.state.account_inout}
                        />
                <label className="form-check-label">Outcome</label>
              </div>
            </div>

            <div className="form-group">
              <label>Money: </label>
              <input type="text"
                      className="form-control"
                      value={this.state.account_money}
                      onChange={this.onChangeAccountMoney}
                      />
            </div>

            <div className="form-group">
              <label>Source: </label>
              <select className="form-control"
                      onChange={this.onChangeAccountSource}
                      >
                { this.sourceList() }
              </select>
            </div>

            <div className="form-group">
              <label>Category: </label>
              <select className="form-control"
                      onChange={this.onChangeAccountCategory}
                      >
                <option disabled selected value> -- Select a category -- </option>
                { this.categoryList() }
              </select>
            </div>

            <div className="form-group">
              <input type="submit" value="Update Account" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
