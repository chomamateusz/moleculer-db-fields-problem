'use strict'

const DbService = require('moleculer-db')

module.exports = {
  name: 'db',

  mixins: [DbService],

  settings: {
    fields: ['_id', 'fields']
  },

}