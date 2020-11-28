import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateAccount from "./accounts/create-account";
import EditAccount from "./accounts/edit-account";
import AccountsList from "./accounts/accounts-list";

export default class AccountsPage extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/accounts" exact component={AccountsList} />
          <Route path="/accounts/create" component={CreateAccount} />
          <Route path="/accounts/edit/:id" component={EditAccount} />
        </div>
      </Router>
    )
  }
}
