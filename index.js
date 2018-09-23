const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/minerva');

const app = new Koa()
const router = require ('./router')


app
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3001, () => console.log('App listening to port 3001 🚀'))