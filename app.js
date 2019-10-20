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
mongoose.connect('mongodb://localhost/url-shortener', {
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
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl

  res.render('result')
})


app.listen(3000, () => {
  console.log('Server is listen to port 3000')
})
