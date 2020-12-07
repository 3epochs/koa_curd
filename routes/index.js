const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
  <form action="/signin" method="post">
      <p>Name: <input name="username"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
  </form>`;
})



router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
