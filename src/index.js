const Boom = require('boom')
const Type = require('@hotelflex/type')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof Type.TypeError) {
      throw Boom.badRequest()
    } else if (err instanceof Type.ValidationError) {
      throw Boom.badData()
    } else {
      throw err
    }
  }
}
