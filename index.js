'use strict' //eslint-disable-line

const express = require('express')
const graphQLHTTP = require('express-graphql')

const data = require('./data')
const PORT = process.env.PORT || 8000
let server

function startGraphQLServer(callback) {
  // Expose a GraphQL endpoint
  const Schema = require('./schema/schema.js').default // eslint-disable-line

  const app = express()

  app.use('/graph', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
    contextValue: {},
    rootValue: {},
    formatError: error => console.log(error) || error  // eslint-disable-line
  }))

  server = app.listen(PORT, () => {
    console.log(`GraphQL server is now running on http://localhost:${PORT}`) // eslint-disable-line
    if (callback) callback()
  })
}

data.then(() => startGraphQLServer())
