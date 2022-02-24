const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
// connect with mongodb
require('./config/mongoose')
const Account = require('./models/account')

// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// body-parser
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req,res) => {
  res.render('login')
})

app.post('/login', (req,res) => {
  const { email, password } = req.body
  console.log(email, password)
  Account.findOne({ email })
    .lean()
    .then(user => {
      console.log(user)
      if(!user) {
        res.render('login', { noUser: "no user" })
      } else if(user.password === password) {
        res.render('welcome', { user })
      } else {
        res.render('login', { invalidPassword: "invalid PW" })
      }
    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(3004, () => {
  console.log('App is running on http://localhost:3004')
})