/*
  Mock Data Fetching Handlers
*/

import { data } from '../data'

const URL_BASE = 'http://pokeql.win'

/*
 * Naming util
 */

const EN = 9
export const getName = (key, id, lang) => (
  (data.langs[key][lang] && data.langs[key][lang][id]) ?
    data.langs[key][lang][id] :
    data.langs[key][EN][id]
)


/*
 * Pokemon
 */

const extendSpecies = species => Object.assign({}, data.sets.pokemon[species.id], species)

// Get single Pokemon by id
export const getPokemon = ({ id }) => extendSpecies(data.sets.species[id])

// Get a single Pokemon by name
export const getPokemonByName = ({ name }) => {
  const identifier = name.toLowerCase().replace(' ', '-')
  return extendSpecies(data.tables.species.find(p => p.identifier === identifier))
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


// Get sprite
export const getPokemonSprite = ({ id }) => `${URL_BASE}/assets/pokemon/${ ('00' + id).substr(-3) }.gif`


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

// Get a single item by id
export const getItem = ({ id }) => data.sets.items[id]

// Get a single item by name
export const getItemByName = ({ name }) => {
  const identifier = name.toLowerCase().replace(' ', '-')
  return data.tables.items.find(p => p.identifier === identifier)
}
