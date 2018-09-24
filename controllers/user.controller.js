const User = require('../models/user.model');

module.exports = {

  login: async (ctx) => {
  let insert = {}
    if(ctx.params.type === 'google') {
      if (!ctx.request.body.profileObj.googleId) {
        ctx.status = 401
        ctx.body = 'A google id is required in login type google'
      } else {
        insert = {
          id: ctx.request.body.profileObj.googleId,
          userName: ctx.request.body.profileObj.name,
          email: ctx.request.body.profileObj.email,
          photo: ctx.request.body.profileObj.imageUrl
        }
      }
    } else {
      ctx.status = 404
      ctx.body = 'A type is required.'
    }
    const exist = await User.find({id: ctx.request.body.profileObj.googleId})
    if(exist.length) {
      ctx.body = exist[0]
      ctx.status = 200
    } else {
      const newUser = new User(insert)
      const saved = await newUser.save()
        .catch((err) => console.log(err))
      if (!saved) {
        ctx.status = 401
        ctx.body = 'All fields are required on sign up'
      } else {
        ctx.body = newUser
        ctx.status = 201
      }
    }
  }
}
