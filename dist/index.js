
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./simple-react-form-hook.cjs.production.min.js')
} else {
  module.exports = require('./simple-react-form-hook.cjs.development.js')
}
