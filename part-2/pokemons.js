const pokemons = require("./data/pokemons.json").pokemon

function groupNamesByType() {
  let sortedPokemons = {}
  pokemons.forEach((pokemon) => {
    pokemon.type.forEach((type) => {
      sortedPokemons[type] ?? (sortedPokemons[type] = [])
      sortedPokemons[type].push(pokemon.name)
    })
  })
  return sortedPokemons
}

function getFastestSpawnName(pokemons) {
  let min_spawn_time = 5252525252
  let min_spawn_time_name = "xz"
  pokemons.forEach((pokemon) => {
    const [min, sec] = pokemon.spawn_time.split(":")
    if (min_spawn_time > min * 60 + sec) {
      min_spawn_time = min * 60 + sec
      min_spawn_time_name = pokemon.name
    }
  })
  return min_spawn_time_name
}

function getTallestId(pokemons) {
  let max_height = 0
  let max_height_id = 0
  pokemons.forEach((pokemon) => {
    if (max_height < Number(pokemon.height.slice(0, 4))) {
      max_height = Number(pokemon.height.slice(0, 4))
      max_height_id = pokemon.id
    }
  })
  return max_height_id
}

function findPokemonPrevNextEvolutions(pokemons, name) {
  const pokemon_evo = { prevEvolution: null, nextEvolution: null }
  pokemons.find((pokemon) => {
    if (pokemon.name === name) {
      pokemon_evo.nextEvolution = pokemon.next_evolution[0].name
    }
  })
  return pokemon_evo
}

function getUniqueWeaknesses(pokemons) {
    const weaknesses = []
    pokemons.forEach((pokemon) => {
        pokemon.weaknesses.forEach((weakness) => {
            if (!weaknesses.includes(weakness)) {
                weaknesses.push(weakness)
            }
        })
    })
    return weaknesses
}

module.exports = {
  groupNamesByType,
  getFastestSpawnName,
  getTallestId,
  findPokemonPrevNextEvolutions,
  getUniqueWeaknesses,
}

