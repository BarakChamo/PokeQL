/*
  Mock Data Fetching Handlers
*/

var data = require('../data').data

/*
 * Pokemon
 */

// Get single Pokemon by id
export const getPokemon = ({ id }) => data.sets.species[id]

// Get a single Pokemon by name
export const getPokemonByName = ({ name }) => {
  const identifier = name.toLowerCase().replace(' ', '-')
  return data.tables.species.find(p => p.identifier === identifier)
}

// Get single Pokemon types
export const getPokemonTypes = ({ id }) => {
  const typeIndex = data.tables.pokemonTypes.findIndex(p => p.pokemon_id === id)
  const types = [data.sets.types[data.tables.pokemonTypes[typeIndex].type_id]]

  if (data.tables.pokemonTypes[typeIndex + 1].pokemon_id === id) {
    types.push(data.sets.types[data.tables.pokemonTypes[typeIndex + 1].type_id])
  }

  return types
}

// Get all pokemon of a given type
export const getPokemonByType = ({ type }) => (
  data.tables.pokemonTypes
    .filter(pokemonType => pokemonType.type_id === type)
    .map(pokemonType => data.sets.species[pokemonType.pokemon_id])
)


/*
 * Types
 */

export const getType = ({ id }) => data.sets.types[id]


/*
 * Evolutions
 */

export const getPokemonEvolutions = ({ id }) => (
  data.tables.species
    .filter(s => s.evolves_from_species_id === id)
    .map(s => data.sets.evolution[s.id])
)


/*
 * Items
 */

export const getItem = ({ id }) => data.sets.items[id]
