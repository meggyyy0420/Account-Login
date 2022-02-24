const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
// connect with mongodb
require('./config/mongoose')
const Account = require('./models/account')

// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req,res) => {
  res.render('login')
})

app.listen(3004, () => {
  console.log('App is running on http://localhost:3004')
})