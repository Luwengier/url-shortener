const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// setting view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting middlewares
app.use(bodyParser.urlencoded({ extended: true }))


// connecting to mongoDB
mongoose.connect('https://localhost/mongodb/', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb erroe!')
})
db.once('open', () => {
  console.log('mongodb connected')
})


// setting routes

