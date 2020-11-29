const Account = require('../models/account-model')

const getAccounts = async(req, res) => {
  await Account.find({}, (err, accounts) => {
    if(err) {
      return res.status(400).json({ success: false, error: err })
    }
    if(!accounts.length) {
      return res.status(404)
                .json({ success: false, error: `Account not found` })
    }
    return res.status(200).json(accounts)
  })
  .catch(err => console.log(err))
}

const getAccount = (req, res) => {
  let id = req.params.id;
  Account.findById(id, function(err, account) {
    res.json(account);
  });
}

const createAccount = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a account',
    })
  }

  const account = new Account(body)

  if(!account) {
    return res.status(400).json({ success: false, error: err })
  }

  account.save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: account._id,
          message: 'Account created!',
        })
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'Account not created!',
        })
      })
}

const editAccount = async(req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Account.findById({ _id: req.params.id }, (err, account) => {
    if(err) {
      return res.status(404).json({
        err,
        message: 'Account not found!',
      })
    }
    account.account_date = body.account_date
    account.account_description = body.account_description
    account.account_inout = body.account_inout
    account.account_money = body.account_money
    account.account_source = body.account_source
    account.account_category = body.account_category
    account.save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: account._id,
            message: 'Account updated!',
          })
        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Account not updated!',
          })
        })
  })
}

const deleteAccount = async(req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to delete',
    })
  }

  Account.findByIdAndRemove({ _id: req.params.id }, (err, account) => {
    if(err) {
      return res.status(404).json({
        err,
        message: 'Account not found!',
      })
    }
    return res.status(200).json({
      success: true,
      id: account._id,
      message: 'Account deleted!',
    })
  })
}

module.exports = {
  getAccounts,
  getAccount,
  createAccount,
  editAccount,
  deleteAccount,
}
