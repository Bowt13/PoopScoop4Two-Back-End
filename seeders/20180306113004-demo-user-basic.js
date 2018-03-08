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
  const breedStats = []
  for (var i = 0; i < 20; i++) {
    const randomBreed = breeds[Math.floor(Math.random()*breeds.length)]
    const randomVotes = Math.floor(Math.random()*70) - 20
    const amountOfdubplicates = breedStats.filter(function(breed) {
      return breed['breed'] == randomBreed
    })
    if (amountOfdubplicates.length == 0 ) {
      console.log(amountOfdubplicates)
      breedStats.push({ breed: randomBreed, votes: randomVotes })
  } else {
    i = i-1
  }
  }
  return breedStats.sort((a, b) => {
    return b.votes - a.votes
  })
}

const fakeUsers = []

for (var i = 0; i < 150; i++) {
  fakeUsers.push(
    {
      name: fakerator.names.name(),
      email: fakerator.internet.email(),
      password: bcrypt.hashSync('secret', 10),
      breedStats: generateBreedStats()
    }
  )
}

fakeUsers.unshift({
  name: 'Jack Russel',
  email: 'jack@example.com',
  password: bcrypt.hashSync('secret', 10),
  breedStats: generateBreedStats()
},
{
  name: 'Peter Dogtown',
  breedStats: generateBreedStats(),
  email: 'peter@example.com',
  password: bcrypt.hashSync('secret', 10)
},
{
  name: 'Lola Pugari',
  breedStats: generateBreedStats(),
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

const newestFakeUsers = newFakeUsers.map(user => {
  user.breedStats = JSON.stringify(user.breedStats)
  return user
})

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', newestFakeUsers, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
