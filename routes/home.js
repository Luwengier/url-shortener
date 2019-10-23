const express = require('express')
const router = express.Router()
const Shorten = require('../models/shorten')


router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router