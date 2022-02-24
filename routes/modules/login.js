const express = require('express')
const router = express.Router()
const Account = require('../../models/account')

router.post('/', (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  Account.findOne({ email })
    .lean()
    .then(user => {
      console.log(user)
      if (!user) {
        res.render('login', { noUser: "no user" })
      } else if (user.password === password) {
        res.render('welcome', { user })
      } else {
        res.render('login', { invalidPassword: "invalid PW" })
      }
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router