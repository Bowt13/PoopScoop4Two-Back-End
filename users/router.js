const Router = require('express').Router
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('../jwt')

const router = new Router()

router.get('/users', (req, res) => {
  User.findAll({
    attributes: ['id', 'name', 'breedStats']
  })
    .then(result => {
      if (!result) return res.status(404).json({ message: "Sorry no users found." })
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong connecting to the database." })
    })
})

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, {
    attributes: ['id', 'name', 'email', 'breedStats']
  })
    .then(user => {
      if (!user) return res.status(404).json({ message: "No user with matching id found."})
      res.json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong connecting to the database." })
    })
})

router.patch('/users/:id', (req, res) => {
  const updates = req.body

  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: "No user with matching id found."})
      return user.update(updates)
    })
    .then(updatedUsed => {
      res.json(updatedUsed)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

router.post('/logins', (req, res) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          jwt: sign(user.id),
          id: user.id
        })
      }
      else {
        res.status(400).send({ message: 'Password was incorrect' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        message: 'Something went wrong'
      })
    })

})

module.exports = router