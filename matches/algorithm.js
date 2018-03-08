const users = [
  { 
    id: 1,
    breedStats: [
      {
        breed: "boxer", 
        votes: 20
      },
      {
        breed: "chow",
        votes: 15
      },
      {
        breed: "dingo",
        votes: 30
      },
      {
        breed: "kelpie",
        votes: 25
      },
      {
        breed: "komondor",
        votes: 17
      },
      {
        breed: "cairn",
        votes: -7
      }
    ]
  },
  { 
    id: 2,
    breedStats: [
      {
        breed: "boxer", 
        votes: 10
      },
      {
        breed: "chow",
        votes: 11
      },
      {
        breed: "dingo",
        votes: 28
      },
      {
        breed: "kelpie",
        votes: 30
      },
      {
        breed: "komondor",
        votes: -5
      },
      {
        breed: "cairn",
        votes: 3
      }
    ]
  },
  { 
    id: 3,
    breedStats: [
      {
        breed: "boxer", 
        votes: 14
      },
      {
        breed: "chow",
        votes: 12
      },
      {
        breed: "dingo",
        votes: 10
      },
      {
        breed: "kelpie",
        votes: -5
      },
      {
        breed: "komondor",
        votes: 47
      },
      {
        breed: "cairn",
        votes: 8
      },
      {
        breed: "husky",
        votes: 10
      }
    ]
  }
]


const newUsers = users.map(user => {
  const totalVotes = user.breedStats.reduce((sum, breed) => {
    return sum + Math.abs(breed.votes)
  }, 0)

  user.totalVotes = totalVotes
  return user
})

const newerUsers = newUsers.map(user => {
  user.breedStats.map(breed => {
    breed.percentage = Math.round(breed.votes / user.totalVotes * 100)
  })
  return user
})


const currentUser = newerUsers[2]

const calcDifference = (a, b) => {
  return Math.abs(a - b)
}

const sameBreed = (a, b) => {
  return a === b
}

const calcDeviation = (userBreedStats, deviation, breedObject) => {
  for (var i = 0; i < userBreedStats.length; i++) {
    const userBreed = userBreedStats[i].breed
    const userPercent = userBreedStats[i].percentage

    if (sameBreed(userBreed, breedObject.breed)) {
      return deviation + calcDifference(userPercent, breedObject.percentage)
    }
    return deviation + breedObject.percentage
  }
}

const isCurrentUser = (user, currentUser) => {
  return user.id === currentUser.id
}

const calcMatchRating = (user, currentUser) => {
  return currentUser.breedStats.reduce((deviation, breedObject) => {
    return calcDeviation(user.breedStats, deviation, breedObject)
  }, 0)
}
const sortMatches = (matches) => {
  return matches.concat().sort((a, b) => {
    return a.matchRating - b.matchRating
  })
}

const getMatches = (users, currentUser) => {
  const matches = newerUsers.map(user => {
    if (isCurrentUser(user, currentUser)) return user

    user.matchRating = calcMatchRating(user, currentUser)
    return user
  })
  return sortMatches(matches)
}

const matches = getMatches(newerUsers, currentUser)

console.log(newerUsers[0])
console.log()
console.log(newerUsers[1])

console.log()
console.log(matches)