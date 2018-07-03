const Boom = require('boom')
const Policy = require('@hotelflex/policy')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof Policy.PolicyError) {
      if (!ctx.request.session.id) {
        throw Boom.unauthorized()
      } else {
        throw Boom.forbidden()
      }
    } else {
      throw err
    }
  }
}
