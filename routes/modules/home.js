const express = require('express')
const router = express.Router()

const Account = require('../../models/account')

router.get('/', (req, res) => {
  let firstName = ''
  let isLogin = false
  if(req.signedCookies.firstName) {
    firstName = req.signedCookies.firstName
    isLogin = true
  }
  console.log(firstName)
  res.render('index',{ firstName, isLogin })
})

router.post('/login', (req, res) => {
  const { firstName, email, password } = req.body
  let isLogin = false
  console.log(email, password)
  Account.findOne({ email })
    .lean()
    .then(user => {
      console.log(user)
      if (!user) {
        res.render('index', { isLogin, noUser: "no user" })
      } else if (user.password === password) {
        isLogin = true
        res.cookie('firstName', user.firstName, {
          path: '/',
          signed: true,
          maxAge: 60000
        })
        res.render('index', { isLogin, firstName: user.firstName })
      } else {
        res.render('index', { isLogin, invalidPassword: "invalid PW" })
      }
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/logout', (req,res) => {
  res.clearCookie('firstName', { path: '/' })
  return res.redirect('/')
})

module.exports = router