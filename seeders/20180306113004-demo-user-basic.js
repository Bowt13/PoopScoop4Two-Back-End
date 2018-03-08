'use strict';
const Fakerator = require('fakerator')
const fakerator = Fakerator()

const bcrypt = require('bcrypt')


const breeds = [
  "husky",
  "keeshond",
  "lhasa",
  "malamute",
  "redbone",
  "shiba",
  "whippet",
  "vizsla",
  "samoyed",
  "saluki",
  "rottweiler",
  "coonhound",
  "chow",
  "chihuahua",
  "clumber",
  "akita",
  "bouvier",
  "boxer",
  "cairn",
  "dachshund",
  "dingo",
  "doberman",
  "appenzeller",
  "borzoi",
  "germanshepherd",
  "labrador",
  "kuvasz",
  "mexicanhairless",
  "otterhound",
  "papillon",
  "pekinese",
  "maltese",
  "lhasa",
  "malinois",
  "leonberg"
]

const generateBreedStats = () => {
  const breedStats = {}
  for (var i = 0; i < 20; i++) {
    const randomBreed = breeds[Math.floor(Math.random()*breeds.length)]
    breedStats[randomBreed] = Math.floor(Math.random*70) - 20
  }
  return breedStats
}

const fakeUsers = []

for (var i = 0; i < 150; i++) {
  fakeUsers.push(
    {
      name: fakerator.names.name(),
      email: fakerator.internet.email(),
      password: bcrypt.hashSync('secret', 10),
      breedStats: JSON.stringify(generateBreedStats())
    }
  )
}

fakeUsers.unshift({
  name: 'Jack Russel',
  email: 'jack@example.com',
  password: bcrypt.hashSync('secret', 10),
  breedStats: JSON.stringify(generateBreedStats())
},
{
  name: 'Peter Dogtown',
  breedStats: JSON.stringify(generateBreedStats()),
  email: 'peter@example.com',
  password: bcrypt.hashSync('secret', 10)
},
{
  name: 'Lola Pugari',
  breedStats: JSON.stringify(generateBreedStats()),
  email: 'lola@example.com',
  password: bcrypt.hashSync('secret', 10)
})

const newFakeUsers = fakeUsers.map(user => {
  const totalVotes = user.breedStats.reduce((sum, breed) => {
    return sum + Math.abs(breed.votes)
  }, 0)

  user.totalVotes = totalVotes
  return user
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seeds = [
    {
      name: 'Jack Russel',
      breedStats: JSON.stringify({pug: 2, shiba: 5, shitzu: -3}),
      email: 'jackrussel@example.com',
      password: bcrypt.hashSync('secret', 10)
    },
    {
      name: 'Peter Dogtown',
      breedStats: JSON.stringify({pug: 1, shiba: -1, shitzu: 3}),
      email: 'peter@example.com',
      password: bcrypt.hashSync('secret', 10)
    },
    {
      name: 'Lola Pugari',
      breedStats: JSON.stringify({vizsla: -1, pug: 3, saluki: -3}),
      email: 'lola@example.com',
      password: bcrypt.hashSync('secret', 10)
    }
    ]

    return queryInterface.bulkInsert('Users', seeds, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
