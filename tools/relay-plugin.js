var getbabelRelayPlugin = require('babel-relay-plugin')
var schema = require('../graph/schema/schema.json')

module.exports = getbabelRelayPlugin(schema.data)
