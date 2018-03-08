const Router = require('express').Router
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('../jwt')
const Op = require('sequelize').Op
const {getMatches} = require('../matches/algorithm')

const router = new Router()

router.get('/users', (req, res) => {
  User.findAll({
    attributes: ['id', 'name', 'breedStats', 'totalVotes']
  })
    .then(result => {
      if (!result) return res.status(404).json({ message: "Sorry no users found." })
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong connecting to the database." })
    })
})

router.get('/matches/:id', (req, res) => {
  User.findById(req.params.id, {
    attributes: { exclude: ['password']}
  })
    .then(entity => {
      User.findAll({
        attributes: { exclude: ['password'] },
        where: {
          id: {
            [Op.not]: req.params.id
          }
        }
      })
        .then(result => {
          console.log()
          const users = JSON.parse(JSON.stringify(result))
          const currentUser = JSON.parse(JSON.stringify(entity))
          res.json(getMatches(users, currentUser).slice(0, 10))
        })
        .catch(err => {
          res.status(500).json({ message: 'Something went wrong.' })
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong.' })
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

router.post('/users', (req, res) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name
  }

  User.create(user)
  .then(entity => {
    res.json({
      id: entity.id,
      email: entity.email,
      name: entity.name
    })
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({
      message: 'Something went wrong'
    })
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
          id: user.id,
          breedStats: user.breedStats
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
