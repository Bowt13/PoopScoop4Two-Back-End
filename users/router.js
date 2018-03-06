const Router = require('express').Router
const {User} = require('../models')

const router = new Router()

router.get('/users', (req, res) => {
  User.findAll()
    .then(result => {
      if (!result) return res.status(404).json({ message: "Sorry no users found." })
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong connecting to the database." })
    })
})

module.exports = router