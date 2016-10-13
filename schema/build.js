'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _handlers = require('../handlers');

/*
 * Type Enum
 */

var Type = new _graphql.GraphQLObjectType({
  name: 'Type',
  description: 'A type of a Pokemon',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        description: 'The ID of a type'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of a type',
        resolve: function resolve(type) {
          return type.identifier;
        }
      },
      pokemon: {
        type: new _graphql.GraphQLList(Pokemon),
        description: 'All the pokemon of the specified type',
        resolve: function resolve(_ref) {
          var type = _ref.id;
          return (0, _handlers.getPokemonByType)({ type: type });
        }
      }
    };
  }
});

/*
 * Evolution Trigger Enum
 */

var EvolutionTrigger = new _graphql.GraphQLEnumType({
  name: 'EvolutionTrigger',
  values: {
    LEVELUP: { value: '1' },
    TRADE: { value: '2' },
    USEITEM: { value: '3' },
    SHED: { value: '4' }
  }
});

/*
 * Move Category Enum
 */

var MoveCategory = new _graphql.GraphQLEnumType({
  name: 'MoveCategory',
  values: {
    STATUS: { value: '0' },
    PHYSICAL: { value: '1' },
    SPECIAL: { value: '2' }
  }
});

/*
 * Move Category Enum
 */

var Gender = new _graphql.GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: { value: '0' },
    FEMALE: { value: '1' }
  }
});

/*
 * Elemental Stone Enum
 */

var Stone = new _graphql.GraphQLEnumType({
  name: 'ElementalStone',
  values: {
    FIRE: { value: '1' },
    WATER: { value: '2' },
    THUNDER: { value: '3' },
    LEAF: { value: '4' },
    MOON: { value: '5' },
    SUN: { value: '6' },
    SHINY: { value: '7' },
    DUSK: { value: '8' }
  }
});

/*
 * Move Type
 */

var Move = new _graphql.GraphQLObjectType({
  name: 'Move',
  description: 'A Move',
  fields: function fields() {
    return {
      type: {
        type: Type,
        description: 'The type of the move'
      },
      category: {
        type: MoveCategory,
        description: 'The category of the move'
      },
      power: {
        type: _graphql.GraphQLFloat,
        description: 'The power of the move'
      },
      accuracy: {
        type: _graphql.GraphQLFloat,
        description: 'The accuracy of the move'
      },
      pp: {
        type: _graphql.GraphQLFloat,
        description: 'The power point of the move'
      },
      probability: {
        type: _graphql.GraphQLFloat,
        description: 'The probability of the move'
      }
    };
  }
});

/*
 * Ability Type
 */

var Ability = new _graphql.GraphQLObjectType({
  name: 'Ability',
  description: 'An Ability',
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the ability'
      }
    };
  }
});

/*
 * Item Type
 */

var Item = new _graphql.GraphQLObjectType({
  name: 'Item',
  description: 'An Item',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        description: 'The ID of the item'
      },
      cost: {
        type: _graphql.GraphQLInt,
        description: 'The cost of the item'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the item',
        resolve: function resolve(item) {
          return item.identifier;
        }
      }
    };
  }
});

/*
 * Species Type
 */

var Species = new _graphql.GraphQLObjectType({
  name: 'Species',
  description: 'A Pokemon species',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        description: 'The id of the Pokemon species'
      }
    };
  }
});

/*
 * Pokemon Type
 */

var Pokemon = new _graphql.GraphQLObjectType({
  name: 'Pokemon',
  description: 'A Pokemon',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLID,
        description: 'The id of the Pokemon'
      },
      species: {
        type: Species,
        description: 'The species of the Pokemon'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the Pokemon',
        resolve: function resolve(pokemon) {
          return pokemon.identifier;
        }
      },
      gender: {
        type: Gender,
        description: 'The required gender'
      },
      mega: {
        type: _graphql.GraphQLBoolean,
        description: 'Is Mega Pokemon'
      },
      types: {
        type: new _graphql.GraphQLList(Type),
        description: 'The types of the Pokemon',
        resolve: function resolve(pokemon) {
          return (0, _handlers.getPokemonTypes)(pokemon);
        }
      },
      // primitive: {
      //
      // },
      evolution: {
        type: new _graphql.GraphQLList(Evolution), //eslint-disable-line
        description: 'The potential evolutions of the Pokemon',
        resolve: function resolve(pokemon) {
          return (0, _handlers.getPokemonEvolutions)(pokemon);
        }
      },
      abilities: {
        type: new _graphql.GraphQLList(Move),
        description: 'The moves of the Pokemon'
      },
      moves: {
        type: new _graphql.GraphQLList(Ability),
        description: 'The abilities of the Pokemon'
      },
      height: {
        type: _graphql.GraphQLFloat,
        description: 'The height of the Pokemon'
      },
      weight: {
        type: _graphql.GraphQLFloat,
        description: 'The weight of the Pokemon'
      },
      health: {
        type: _graphql.GraphQLFloat,
        description: 'The HP of the Pokemon'
      },
      attack: {
        type: _graphql.GraphQLFloat,
        description: 'The Attack of the Pokemon'
      },
      defense: {
        type: _graphql.GraphQLFloat,
        description: 'The Defense of the Pokemon'
      },
      specialAttack: {
        type: _graphql.GraphQLFloat,
        description: 'The Special Attack of the Pokemon'
      },
      specialDefense: {
        type: _graphql.GraphQLFloat,
        description: 'The Special Defense of the Pokemon'
      },
      speed: {
        type: _graphql.GraphQLFloat,
        description: 'The Speed of the Pokemon'
      }
    };
  }
});

/*
 * Evolution Type
 */

var Evolution = new _graphql.GraphQLObjectType({
  name: 'Evolution',
  description: 'An Evolution',
  fields: function fields() {
    return {
      pokemon: {
        type: Pokemon,
        description: 'The Pokemon evolving to',
        resolve: function resolve(_ref2) {
          var id = _ref2.evolved_species_id;
          return (0, _handlers.getPokemon)({ id: id });
        }
      },
      trigger: {
        type: EvolutionTrigger,
        description: 'The evolution trigger',
        resolve: function resolve(evolution) {
          return evolution.evolution_trigger_id;
        }
      },
      item: {
        type: Item,
        description: 'The required item',
        resolve: function resolve(_ref3) {
          var id = _ref3.trigger_item_id;
          return (0, _handlers.getItem)({ id: id });
        }
      },
      level: {
        type: _graphql.GraphQLInt,
        description: 'The required level',
        resolve: function resolve(evolution) {
          return evolution.minimum_level || null;
        }
      },
      happiness: {
        type: _graphql.GraphQLInt,
        description: 'If happiness required',
        resolve: function resolve(evolution) {
          return evolution.minimum_happiness || null;
        }
      }
    };
  }
});

/*
 * Viewer Type
 */

var Viewer = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  description: 'Viewer is the current user',
  fields: function fields() {
    return {
      pokemon: {
        type: Pokemon,
        description: 'A Pokemon',
        args: {
          id: {
            type: _graphql.GraphQLID,
            description: 'The ID of the Pokemon'
          },
          name: {
            type: _graphql.GraphQLString,
            description: 'The name of the Pokemon'
          }
        },
        resolve: function resolve(root, _ref4) {
          var id = _ref4.id;
          var name = _ref4.name;
          return name ? (0, _handlers.getPokemonByName)({ name: name }) : (0, _handlers.getPokemon)({ id: id });
        }
      },
      type: {
        type: Type,
        description: 'A Pokemon Type',
        args: {
          id: {
            type: _graphql.GraphQLID,
            description: 'The ID of the Pokemon Type'
          },
          name: {
            type: _graphql.GraphQLString,
            description: 'The name of the Pokemon Type'
          }
        },
        resolve: function resolve(root, params) {
          return (0, _handlers.getType)(params);
        }
      },
      stone: {
        type: Stone,
        description: 'An Elemental Stone'
      }
    };
  }
});

/*
 * Query Type
 */

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'The query entrypoint',
  fields: function fields() {
    return {
      viewer: {
        type: Viewer,
        description: 'The current user',
        args: {
          lang: {
            type: _graphql.GraphQLString,
            description: 'The language of the viewer',
            defaultValue: 'EN'
          }
        },
        resolve: function resolve(root, params, ctx) {
          // Extend root params to all execution contexts
          Object.assign(ctx, { params: params });

          // Return empty viewer
          return {};
        }
      }
    };
  }
});

/*
 * Evolution Mutation Input
 */

var EvolutionInput = new _graphql.GraphQLInputObjectType({
  name: 'EvolutionInput',
  description: 'An input for an evolution',
  fields: function fields() {
    return {
      pokemonId: {
        type: _graphql.GraphQLID,
        description: 'The ID of the evolving pokemon'
      },
      stone: {
        type: Stone,
        description: 'The Stone used for the evolution'
      }
    };
  }
});

/*
 * Evolution Mutation
 */

var Evolve = new _graphql.GraphQLObjectType({
  name: 'Evolve',
  description: 'An evolution mutation',
  fields: function fields() {
    return {
      pokemon: {
        type: Pokemon,
        description: 'The evolved pokemon'
      }
    };
  },
  args: {
    evolution: {
      type: EvolutionInput,
      description: 'The evolution'
    }
  }
});

/*
 * Mutation Type
 */

var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'The mutation entrypoint',
  fields: function fields() {
    return {
      evolve: {
        type: Evolve,
        description: 'Evolve a Pokemon'
      }
    };
  }
});

/*
 * Schema
 */

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;
'use strict'; //eslint-disable-line

// const chokidar = require('chokidar')

var express = require('express');
var graphQLHTTP = require('express-graphql');

// const clean = require('require-clean').clean
// const exec = require('child_process').exec

var data = require('./data');
var PORT = process.env.PORT || 8000;
var server = void 0;

function startGraphQLServer(callback) {
  // Expose a GraphQL endpoint
  // clean('./schema/schema.js')
  var Schema = require('./schema/schema.js').default; // eslint-disable-line

  var app = express();

  app.use('/graph', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
    contextValue: {},
    rootValue: {},
    formatError: function formatError(error) {
      return console.log(error) || error;
    } // eslint-disable-line
  }));

  server = app.listen(PORT, function () {
    console.log('GraphQL server is now running on http://localhost:' + PORT); // eslint-disable-line
    if (callback) callback();
  });
}

// const watcher = chokidar.watch('./schema/schema.js')
//
// watcher.on('change', (path) => {
//   console.log(`\`${path}\` changed. Restarting.`) // eslint-disable-line
//
//   // Stop GrpahQL server
//   if (server) server.close()
//
//   // Compile the schema
//   exec('npm run update-schema', (error, stdout) => {
//     console.log(stdout) // eslint-disable-line
//     startGraphQLServer(
//       () => console.log('Restart your browser to use the updated schema.') // eslint-disable-line
//     )
//   })
// })

data.then(function () {
  return startGraphQLServer();
});
