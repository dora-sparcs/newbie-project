import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Source = ["Card", "Cash", "Bank"];

const Account = props => {
  return(
    <tr>
      <td>{props.account.account_date != null ? props.account.account_date.substring(0, 10) : ""}</td>
      <td className="left">{props.account.account_description}</td>
      {Source.map(function(currentSource){
        return <td className={props.account.account_inout === true ? "income" : "outcome"}>{props.account.account_source === currentSource ? ((props.account.account_inout === true ? "+" : "-") + props.account.account_money + "원") : null}</td>
      })}
      <td>{props.account.account_category}</td>
      <td>
        <Link to={"accounts/edit/"+props.account._id}>Edit</Link>
      </td>
      <td>
        <Link onClick={props.onChange}>Delete</Link>
      </td>
    </tr>
  )
};

export default class AccountsList extends Component {

  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4018/newbie-project/accounts')
          .then(response => {
            this.setState(prevState => ({
              ...prevState,
              accounts: response.data
            }))
          })
          .catch(function(error){
            console.log(error);
          });
  }

  onDelete = (index) => (
    (e) => {
      e.preventDefault();
      this.state.accounts.map(
        (account, idx) => {
          if(idx === index) {
            console.log(account._id)
            axios.delete('http://localhost:4018/newbie-project/accounts/delete/'+account._id, account)
                  .then(res => {
                    console.log(res.data)
                    this.props.history.push('/accounts');
                  });
          }
        }
      )
      window.location.reload(true);
    }
  )

  accountList() {
    return this.state.accounts.map((currentAccount, index) => {
      return <Account account={currentAccount}
                        onChange={this.onDelete(index)}
                        key={index}
                        />
    }).sort((account1, account2) => {
      const account_date1 = account1.props.account.account_date
      const account_date2 = account2.props.account.account_date
      return account_date2.localeCompare(account_date1);
    });
  }

  sourceHeader() {
    return Source.map(function(currentSource){
      return <th className="tmoney">{currentSource}</th>
    })
  }

  totalInOut() {
    var totalIncome = 0;
    var totalOutcome = 0;
    this.state.accounts.map((currentAccount, index) => {
      if(currentAccount.account_inout) totalIncome += currentAccount.account_money;
      else totalOutcome = currentAccount.account_money;
    })
    var total = totalIncome - totalOutcome;
    return [total, totalIncome, totalOutcome];
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>Account Book </h3>
          <Link to="/accounts/create">+ Create Account</Link>
          <table className="table table-bordered" style={{ marginTop: 20 }} >
            <thead>
              <tr>
                <th rowspan="2" className="tdate">Date</th>
                <th rowspan="2">Description</th>
                { this.sourceHeader() }
                <th rowspan="2">Category</th>
                <th rowspan="2" colspan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.accountList() }
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4"></td>
                <td>Total</td>
                <td className="tmoney">{ this.totalInOut()[0] > 0 ? "+" : "" }{ this.totalInOut()[0] }원</td>
                <td className="income tmoney">+{ this.totalInOut()[1] }원</td>
                <td className= "outcome tmoney">-{ this.totalInOut()[2] }원</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }
}
