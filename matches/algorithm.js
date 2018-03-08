const addVotePercentage = (users) => {
  return users.map(user => {
    user.breedStats.map(breed => {
      breed.percentage = Math.round(breed.votes / user.totalVotes * 100)
    })
    return user
  })
}

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
    return deviation + Math.abs(breedObject.percentage)
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
  const newUsers = addVotePercentage(users)
  const newCurrUser = addVotePercentage([currentUser])[0]
  newCurrUser.breedStats = newCurrUser.breedStats.slice(0, 3)
  const matches = newUsers.map(user => {
    if (isCurrentUser(user, currentUser)) return user

    user.matchRating = calcMatchRating(user, currentUser)
    return user
  })
  return sortMatches(matches)
}

module.exports = {getMatches}