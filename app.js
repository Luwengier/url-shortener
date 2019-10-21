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
  const newUrl = 'http://localhost:3000/' + Math.random().toString(36).slice(-5)
  const shorten = new Shorten({
    inputUrl: inputUrl,
    newUrl: newUrl
  })
  shorten.save(err => {
    if (err) return console.error(err)
    return res.render('result', { newUrl })
  })
})

app.get('/:newUrl', (req, res) => {
  Shorten.findOne({ newUrl: ('http://localhost:3000/' + req.params.newUrl) }, (err, shorten) => {
    if (err) console.error(err)
    res.redirect(`${shorten.inputUrl}`)
  })
})


app.listen(3000, () => {
  console.log('Server is listen to port 3000')
})
