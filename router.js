const Router = require('koa-router')
const router = new Router()

const userController = require('./controllers/user.controller')

router
  .get('/check', ctx => {
    ctx.status = 200
    ctx.body = 'OK'
    return
  })
  .post('/login/:type', userController.login)
  .post('/library/:id', userController.addBookToLibrary)

module.exports = router