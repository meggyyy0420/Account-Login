const express = require('express')
const app = express()

require('./config/mongoose')
const Account = require('./models/account')

app.get('/', (req,res) => {
  res.send('Account Login')
})

app.listen(3004, () => {
  console.log('App is running on http://localhost:3004')
})