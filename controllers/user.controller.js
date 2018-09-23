const User = require('../models/user.model');

module.exports = {
  login: async (ctx) => {
    if(ctx.params.type === 'google') {
      if (!ctx.request.body.googleId) {
        ctx.status = 401
        ctx.body = 'A google id is required in login type google'
      } else {
        ctx.insert = {
          id: ctx.request.body.googleId,
          userName: ctx.request.body.name,
          email: ctx.request.body.email,
          photo: ctx.request.body.imgUrl
        }
      }
    } else {
      ctx.status = 404
      ctx.body = 'A type is required.'
    }

    const exist = await User.find({id: ctx.request.body.id})
    if(exist.length) {
      ctx.body = exist[0]
      ctx.status = 200
    } else {
      const newUser = new User(ctx.insert)
      const saved = await newUser.save()
        .catch(() => false)
      if (!saved) {
        ctx.status = 401
        ctx.body = 'All fields are required on sign up'
      } else {
        ctx.body = newUser
        ctx.status = 201
      }
    }

    console.log(exist)
  }
}