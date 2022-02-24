const express = require('express')
const app = express()


app.get('/', (req,res) => {
  res.send('Account Login')
})

app.listen(3004, () => {
  console.log('App is running on http://localhost:3004')
})