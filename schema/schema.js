import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql'

import {
  getPokemon,
  getPokemonByName,
  getPokemonTypes,
  getPokemonByType,
  getPokemonEvolutions,
  getType,
  getItem,
} from '../handlers'


/*
 * Utils
 */

const idToName = id => id
  .replace('-', ' ')
  .replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))



/*
 * Type Enum
 */

const Type = new GraphQLObjectType({
  name: 'Type',
  description: 'A type of a Pokemon',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The ID of a type',
    },
    name: {
      type: GraphQLString,
      description: 'The name of a type',
      resolve: type => idToName(type.identifier),
    },
    pokemon: {
      type: new GraphQLList(Pokemon),
      description: 'All the pokemon of the specified type',
      resolve: ({ id: type }) => getPokemonByType({ type }),
    },
  }),
})


/*
 * Evolution Trigger Enum
 */

const EvolutionTrigger = new GraphQLEnumType({
  name: 'EvolutionTrigger',
  values: {
    LEVELUP: { value: '1' },
    TRADE: { value: '2' },
    USEITEM: { value: '3' },
    SHED: { value: '4' },
  },
})


/*
 * Move Category Enum
 */

const MoveCategory = new GraphQLEnumType({
  name: 'MoveCategory',
  values: {
    STATUS: { value: '0' },
    PHYSICAL: { value: '1' },
    SPECIAL: { value: '2' },
  },
})

/*
 * Move Category Enum
 */

const Gender = new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: { value: '0' },
    FEMALE: { value: '1' },
  },
})


/*
 * Elemental Stone Enum
 */

const Stone = new GraphQLEnumType({
  name: 'ElementalStone',
  values: {
    FIRE: { value: '1' },
    WATER: { value: '2' },
    THUNDER: { value: '3' },
    LEAF: { value: '4' },
    MOON: { value: '5' },
    SUN: { value: '6' },
    SHINY: { value: '7' },
    DUSK: { value: '8' },
  },
})


/*
 * Move Type
 */

const Move = new GraphQLObjectType({
  name: 'Move',
  description: 'A Move',
  fields: () => ({
    type: {
      type: Type,
      description: 'The type of the move',
    },
    category: {
      type: MoveCategory,
      description: 'The category of the move',
    },
    power: {
      type: GraphQLFloat,
      description: 'The power of the move',
    },
    accuracy: {
      type: GraphQLFloat,
      description: 'The accuracy of the move',
    },
    pp: {
      type: GraphQLFloat,
      description: 'The power point of the move',
    },
    probability: {
      type: GraphQLFloat,
      description: 'The probability of the move',
    },
  }),
})


/*
 * Ability Type
 */

const Ability = new GraphQLObjectType({
  name: 'Ability',
  description: 'An Ability',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the ability',
    },
  }),
})


/*
 * Item Type
 */

const Item = new GraphQLObjectType({
  name: 'Item',
  description: 'An Item',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The ID of the item',
    },
    cost: {
      type: GraphQLInt,
      description: 'The cost of the item',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the item',
      resolve: item => idToName(item.identifier),
    },
  }),
})


/*
 * Species Type
 */

const Species = new GraphQLObjectType({
  name: 'Species',
  description: 'A Pokemon species',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The id of the Pokemon species',
    },
  }),
})


/*
 * Pokemon Type
 */

const Pokemon = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'A Pokemon',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The id of the Pokemon',
    },
    species: {
      type: Species,
      description: 'The species of the Pokemon',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Pokemon',
      resolve: pokemon => idToName(pokemon.identifier),
    },
    gender: {
      type: Gender,
      description: 'The required gender',
    },
    mega: {
      type: GraphQLBoolean,
      description: 'Is Mega Pokemon',
    },
    types: {
      type: new GraphQLList(Type),
      description: 'The types of the Pokemon',
      resolve: pokemon => getPokemonTypes(pokemon),
    },
    // primitive: {
    //
    // },
    evolution: {
      type: new GraphQLList(Evolution), //eslint-disable-line
      description: 'The potential evolutions of the Pokemon',
      resolve: pokemon => getPokemonEvolutions(pokemon),
    },
    abilities: {
      type: new GraphQLList(Move),
      description: 'The moves of the Pokemon',
    },
    moves: {
      type: new GraphQLList(Ability),
      description: 'The abilities of the Pokemon',
    },
    height: {
      type: GraphQLFloat,
      description: 'The height of the Pokemon',
    },
    weight: {
      type: GraphQLFloat,
      description: 'The weight of the Pokemon',
    },
    health: {
      type: GraphQLFloat,
      description: 'The HP of the Pokemon',
    },
    attack: {
      type: GraphQLFloat,
      description: 'The Attack of the Pokemon',
    },
    defense: {
      type: GraphQLFloat,
      description: 'The Defense of the Pokemon',
    },
    specialAttack: {
      type: GraphQLFloat,
      description: 'The Special Attack of the Pokemon',
    },
    specialDefense: {
      type: GraphQLFloat,
      description: 'The Special Defense of the Pokemon',
    },
    speed: {
      type: GraphQLFloat,
      description: 'The Speed of the Pokemon',
    },
  }),
})


/*
 * Evolution Type
 */

const Evolution = new GraphQLObjectType({
  name: 'Evolution',
  description: 'An Evolution',
  fields: () => ({
    pokemon: {
      type: Pokemon,
      description: 'The Pokemon evolving to',
      resolve: ({ evolved_species_id: id }) => getPokemon({ id }),
    },
    trigger: {
      type: EvolutionTrigger,
      description: 'The evolution trigger',
      resolve: evolution => evolution.evolution_trigger_id,
    },
    item: {
      type: Item,
      description: 'The required item',
      resolve: ({ trigger_item_id: id }) => getItem({ id }),
    },
    level: {
      type: GraphQLInt,
      description: 'The required level',
      resolve: evolution => evolution.minimum_level || null,
    },
    happiness: {
      type: GraphQLInt,
      description: 'If happiness required',
      resolve: evolution => evolution.minimum_happiness || null,
    },
  }),
})


/*
 * Viewer Type
 */

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Viewer is the current user',
  fields: () => ({
    pokemon: {
      type: Pokemon,
      description: 'A Pokemon',
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of the Pokemon',
        },
        name: {
          type: GraphQLString,
          description: 'The name of the Pokemon',
        },
      },
      resolve: (root, { id, name }) => (
        name ? getPokemonByName({ name }) : getPokemon({ id })
      ),
    },
    type: {
      type: Type,
      description: 'A Pokemon Type',
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of the Pokemon Type',
        },
        name: {
          type: GraphQLString,
          description: 'The name of the Pokemon Type',
        },
      },
      resolve: (root, params) => getType(params),
    },
    stone: {
      type: Stone,
      description: 'An Elemental Stone',
    },
  }),
})


/*
 * Query Type
 */


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query entrypoint',
  fields: () => ({
    viewer: {
      type: Viewer,
      description: 'The current user',
      args: {
        lang: {
          type: GraphQLString,
          description: 'The language of the viewer',
          defaultValue: 'EN',
        },
      },
      resolve: (root, params, ctx) => {
        // Extend root params to all execution contexts
        Object.assign(ctx, { params })

        // Return empty viewer
        return {}
      },
    },
  }),
})


/*
 * Evolution Mutation Input
 */

const EvolutionInput = new GraphQLInputObjectType({
  name: 'EvolutionInput',
  description: 'An input for an evolution',
  fields: () => ({
    pokemonId: {
      type: GraphQLID,
      description: 'The ID of the evolving pokemon',
    },
    stone: {
      type: Stone,
      description: 'The Stone used for the evolution',
    },
  }),
})

/*
 * Evolution Mutation
 */

const Evolve = new GraphQLObjectType({
  name: 'Evolve',
  description: 'An evolution mutation',
  fields: () => ({
    pokemon: {
      type: Pokemon,
      description: 'The evolved pokemon',
    },
  }),
  args: {
    evolution: {
      type: EvolutionInput,
      description: 'The evolution',
    },
  },
})


/*
 * Mutation Type
 */

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The mutation entrypoint',
  fields: () => ({
    evolve: {
      type: Evolve,
      description: 'Evolve a Pokemon',
    },
  }),
})


/*
 * Schema
 */

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

export default Schema
