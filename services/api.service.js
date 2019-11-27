'use strict'

const ApiGateway = require('moleculer-web')

module.exports = {
  name: 'api',

  mixins: [ApiGateway],

  settings: {
    port: process.env.PORT || 3000,

    routes: [{
      path: '/api',
      aliases: {
        'REST db': 'db'
      },
      whitelist: [
        'db.*'
      ],
      bodyParsers: {
        json: true,
        urlencoded: { extended: true }
      },
    }],

  }
}
