const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Shorten = require('./models/shorten')

// setting view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting middlewares
app.use(bodyParser.urlencoded({ extended: true }))


// connecting to mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb erroe!')
})
db.once('open', () => {
  console.log('mongodb connected')
})


// setting routes
app.use('/', require('./routes/home'))
app.use('/', require('./routes/shorten'))

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})