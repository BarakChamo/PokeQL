'use strict' //eslint-disable-line

const chokidar = require('chokidar')
const express = require('express')
const graphQLHTTP = require('express-graphql')

const clean = require('require-clean').clean
const exec = require('child_process').exec

const data = require('./data')

const PORT = 8000
let server

function startGraphQLServer(callback) {
  // Expose a GraphQL endpoint
  clean('./schema/schema.js')
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

const watcher = chokidar.watch('./schema/schema.js')

watcher.on('change', (path) => {
  console.log(`\`${path}\` changed. Restarting.`) // eslint-disable-line

  // Stop GrpahQL server
  if (server) server.close()

  // Compile the schema
  exec('npm run update-schema', (error, stdout) => {
    console.log(stdout) // eslint-disable-line
    startGraphQLServer(
      () => console.log('Restart your browser to use the updated schema.') // eslint-disable-line
    )
  })
})

data.then(() => startGraphQLServer())
