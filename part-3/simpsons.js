const simpsonsCharacters = [
  {
    name: "Homer Simpson",
    group: "Simpson Family",
    age: 50,
    isLikeBeer: true,
    likesFlowers: ["rose", "iris"],
  },
  {
    name: "Marge Simpson",
    group: "Simpson Family",
    age: 50,
    isLikeBeer: false,
    likesFlowers: ["rose", "aloe", "iris"],
  },
  {
    name: "Ned Flanders",
    group: "Neighbor",
    age: 33,
    isLikeBeer: false,
    likesFlowers: ["rose"],
  },
  {
    name: "Maude Flanders",
    group: "Neighbor",
    age: 23,
    isLikeBeer: true,
    likesFlowers: ["rose", "peony"],
  },
  {
    name: "Rod Flanders",
    group: "Neighbor",
    age: 55,
    isLikeBeer: false,
    likesFlowers: ["rose", "iris"],
  },
  {
    name: "Todd Flanders",
    group: "Neighbor",
    age: 32,
    isLikeBeer: false,
    likesFlowers: ["rose", "aloe"],
  },
  {
    name: "Montgomery Burns",
    group: "Antagonists",
    age: 21,
    isLikeBeer: true,
    likesFlowers: ["rose", "aloe", "peony"],
  },
  {
    name: "Waylon Smithers",
    group: "Antagonists",
    age: 66,
    isLikeBeer: true,
    likesFlowers: ["rose", "peony"],
  },
]

function groupByGroup(simpsonsCharacters) {
  const byGroups = {}
  simpsonsCharacters.forEach((character) => {
    if (!byGroups[character.group]) {
      byGroups[character.group] = []
    }
    byGroups[character.group].push(character)
  })
  return byGroups
}

function getUniqueFlowers(simpsonsCharacters) {
  const flowers = []
  simpsonsCharacters.forEach((character) => {
    character.likesFlowers.forEach((flower) => {
      if (!flowers.includes(flower)) {
        flowers.push(flower)
      }
    })
  })
  return flowers
}

function filterSimpsonsCharacters(simpsonsCharacters, str) {
  return simpsonsCharacters.filter((character) => {
    const [param, num] = str.split("=")
    if (param == "over")
      if (character.age > Number(num)) return simpsonsCharacters
    if (param == "under")
      if (character.age < Number(num)) return simpsonsCharacters
  })
}

function changeIsLikeBeerWithoutMutation(simpsonsCharacters) {
  return simpsonsCharacters.map((character) => {
    character.isLikeBeer = !character.isLikeBeer
    return character
  })
}

module.exports = {
  groupByGroup,
  getUniqueFlowers,
  filterSimpsonsCharacters,
  changeIsLikeBeerWithoutMutation,
}

