const express = require('express')
const router = express.Router()
const Shorten = require('../models/shorten')


router.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl

  let newUrls = new Promise((resolve, reject) => {
    Shorten.find({}, (err, shortens) => {
      let newUrlArr = []
      shortens.forEach(shorten => {
        newUrlArr.push(shorten.newUrl)
      })
      return resolve(newUrlArr)
    })
  })

  async function start() {
    try {
      let newUrlArr = await newUrls
      let newUrl = 'http://localhost:3000/new/' + Math.random().toString(36).slice(-5)
      while (newUrlArr.includes(newUrl)) {
        newUrl = 'http://localhost:3000/new/' + Math.random().toString(36).slice(-5)
      }
      const newShorten = new Shorten({
        inputUrl: inputUrl,
        newUrl: newUrl
      })

      newShorten.save(err => {
        if (err) return console.error(err)
        return res.render('result', { newUrl })
      })
    } catch (e) {
      console.warn(e)
    }
  }
  start()
})

router.get('/new/:newUrl', (req, res) => {
  Shorten.findOne({ newUrl: ('http://localhost:3000/new/' + req.params.newUrl) }, (err, shorten) => {
    if (err) console.error(err)
    res.redirect(`${shorten.inputUrl}`)
  })
})


module.exports = router
