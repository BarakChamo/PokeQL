
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import { GraphiQL } from './components/GraphiQL.jsx'
import { getTop } from 'graphiql/dist/utility/elementPosition'

import Dex from './components/Dex.jsx'

import './style.css'
import './graphiql.css'

// Default query
const defaultQuery = `# Welcome to GraphiQL
#
# GraphiQL is an in-browser IDE for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will
# see intelligent typeaheads aware of the current GraphQL type schema and
# live syntax and validation errors highlighted within the text.
#
# To bring up the auto-complete at any point, just press Ctrl-Space.
#
# Press the run button above, or Cmd-Enter to execute the query, and the result
# will appear in the pane to the right.

query ($lang: Language) {
  trainer(lang: $lang) {
    pokemon(id: "1") {
      id
      name
      sprite
      types {
        name
      }
    }
  }
}
`;

// Default variables
const defaultVariables = `{
  "lang": "JA"
}`

const GRAPH_URL = 'http://localhost:8000'

const root = document.getElementById('app')

const graphQLFetcher = graphQLParams => fetch(GRAPH_URL, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(graphQLParams),
}).then(response => response.json())


// Base App
class App extends Component {
  constructor() {
    super()

    this.state = {
      response: {},
      variables: defaultVariables,
      query: defaultQuery,
      dexOpen: true,
      dexHeight: 400,
    }

    this.fetch = this.fetch.bind(this)
  }

  fetch(graphQLParams) {
    return graphQLFetcher(graphQLParams)
    .then((response) => {
      setTimeout(() => this.setState({ response }))
      return response
    })
  }

  render() {
    const { lang } = JSON.parse(this.state.variables)

    return (
      <GraphiQL
        fetcher={this.fetch}
        query={this.state.query}
        variables={this.state.variables}
        onEditQuery={query => this.setState({ query })}
        onEditVariables={variables => this.setState({ variables })}
      >
        <GraphiQL.Logo>
        <span>&nbsp;</span>
          <img src="/assets/logo.png" style={{ height: '100%', width: 'auto' }} alt="" />
          <span>&nbsp;</span>
          <img src="/assets/ql.png" style={{ height: '80%', width: 'auto' }} alt="" />
        </GraphiQL.Logo>
        <GraphiQL.Footer>
          <div className="variable-editor" style={{height: this.state.dexOpen ? this.state.dexHeight : null}}>
            <div
              className="variable-editor-title"
              style={{ cursor: this.state.dexOpen ? 'row-resize' : 'n-resize' }}
              onMouseDown={() => this.setState({ dexOpen: !this.state.dexOpen })}
            >{'PokeDex'}</div>
            {this.state.dexOpen && <Dex lang={lang} data={this.state.response.data} />}
          </div>
        </GraphiQL.Footer>
      </GraphiQL>
    )
  }
}

// Render app
ReactDOM.render(<App />, root)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default // eslint-disable-line
    ReactDOM.render(<NewApp />, root)
  })
}
