const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
// connect with mongodb
require('./config/mongoose')

const routes = require('./routes')

// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// body-parser
app.use(express.urlencoded({ extended: true }))

// cookie-parser
app.use(cookieParser('123456789'))

// routes
app.use(routes)

app.listen(3004, () => {
  console.log('App is running on http://localhost:3004')
})