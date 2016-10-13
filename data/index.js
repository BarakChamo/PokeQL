/*
  Map Data from PokeAPI
*/

var parse = require('../utils/parse')

var parseList = parse.parseList
var parseObject = parse.parseObject

var log = l => (() => console.log(l)) //eslint-disable-line

// Load data in-memory (i know...)
var data = { tables: {}, sets: {} }

var promise = Promise.all([
  parseList('node_modules/pokeapi/data/v2/csv/pokemon.csv')
    .then((pokemon) => { data.tables.pokemon = pokemon })
    .then(log('Pokemon loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/pokemon_species.csv')
    .then((species) => { data.sets.species = species })
    .then(log('Pokemon set loaded...')),

  parseList('node_modules/pokeapi/data/v2/csv/pokemon_species.csv')
    .then((species) => { data.tables.species = species })
    .then(log('Pokemon Species loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/pokemon_evolution.csv', 1)
    .then((evolution) => { data.sets.evolution = evolution })
    .then(log('Pokemon Evolution loaded...')),

  parseList('node_modules/pokeapi/data/v2/csv/pokemon_types.csv')
    .then((pokemonTypes) => { data.tables.pokemonTypes = pokemonTypes })
    .then(log('Pokemon Types loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/types.csv')
    .then((types) => { data.sets.types = types })
    .then(log('Types loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/abilities.csv')
    .then((abilities) => { data.sets.abilities = abilities })
    .then(log('Abilities loaded...')),

  parseObject('node_modules/pokeapi/data/v2/csv/items.csv')
    .then((items) => { data.sets.items = items })
    .then(log('Items loaded...')),
])

// When done loading expose the data
.then(() => data)

module.exports = promise
module.exports.data = data
