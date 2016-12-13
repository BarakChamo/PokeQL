/*
  Map Data from PokeAPI
*/

import { parseList, parseObject, parseGroupedObject } from '../utils/parse'

const log = l => (() => console.log(l)) //eslint-disable-line

// Load data in-memory (i know...)
const data = { tables: {}, sets: {}, langs: {} }

const promise = Promise.all([
  /* Load Lists */
  parseList('node_modules/pokeapi/data/v2/csv/pokemon_species.csv')
  .then((species) => { data.tables.species = species })
  .then(log('Pokemon Species List loaded...')),

  parseList('node_modules/pokeapi/data/v2/csv/pokemon_types.csv')
  .then((pokemonTypes) => { data.tables.pokemonTypes = pokemonTypes })
  .then(log('Pokemon Types List loaded...')),

  parseList('node_modules/pokeapi/data/v2/csv/pokemon_moves.csv')
  .then((pokemonMoves) => { data.tables.pokemonMoves = pokemonMoves })
  .then(log('Pokemon Moves List loaded...')),

  parseList('node_modules/pokeapi/data/v2/csv/pokemon_abilities.csv')
  .then((pokemonAbilities) => { data.tables.pokemonAbilities = pokemonAbilities })
  .then(log('Pokemon Abilities List loaded...')),

  parseList('node_modules/pokeapi/data/v2/csv/items.csv')
  .then((items) => { data.tables.items = items })
  .then(log('Items List loaded...')),

  /* Load Objects */
  parseObject('node_modules/pokeapi/data/v2/csv/pokemon.csv')
    .then((pokemon) => { data.sets.pokemon = pokemon })
    .then(log('Pokemon loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/pokemon_species.csv')
    .then((species) => { data.sets.species = species })
    .then(log('Pokemon Species loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/pokemon_evolution.csv', 1)
    .then((evolution) => { data.sets.evolution = evolution })
    .then(log('Pokemon Evolution loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/pokemon_evolution.csv', 1)
    .then((evolution) => { data.sets.evolution = evolution })
    .then(log('Pokemon Evolution loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/types.csv')
    .then((types) => { data.sets.types = types })
    .then(log('Types loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/abilities.csv')
    .then((abilities) => { data.sets.abilities = abilities })
    .then(log('Abilities loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/moves.csv')
    .then((moves) => { data.sets.moves = moves })
    .then(log('Moves loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/items.csv')
    .then((items) => { data.sets.items = items })
    .then(log('Items loaded...')),

  /* Load Language Groups */
  parseGroupedObject('node_modules/pokeapi/data/v2/csv/pokemon_species_names.csv')
    .then((species) => { data.langs.species = species })
    .then(log('Pokemon Species Names loaded...')),

  parseGroupedObject('node_modules/pokeapi/data/v2/csv/item_names.csv')
    .then((items) => { data.langs.items = items })
    .then(log('Items Names loaded...')),

  parseGroupedObject('node_modules/pokeapi/data/v2/csv/ability_names.csv')
    .then((abilities) => { data.langs.abilities = abilities })
    .then(log('Ability Names loaded...')),

  parseGroupedObject('node_modules/pokeapi/data/v2/csv/move_names.csv')
    .then((moves) => { data.langs.moves = moves })
    .then(log('Move Names loaded...')),

  parseGroupedObject('node_modules/pokeapi/data/v2/csv/type_names.csv')
    .then((types) => { data.langs.types = types })
    .then(log('Type Names loaded...')),

  parseGroupedObject('node_modules/pokeapi/data/v2/csv/pokemon_color_names.csv')
    .then((colors) => { data.langs.colors = colors })
    .then(log('Color Names loaded...')),
])

// When done loading expose the data
.then(() => data)

module.exports = promise
module.exports.data = data
