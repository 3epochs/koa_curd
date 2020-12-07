const router = require('koa-router')();
const {query} = require('../config/dbPool');
const {QUERY_SQL, INSERT_SQL, UPDATE_SQL, DELETE_SQL} = require('../config/dbSQL');
const bodyparser = require('koa-bodyparser');


router.use(bodyparser());
// Retrieve
router.get('/search', async  (ctx, next)  => {
    // console.log('search in dbOp');
    const data = await query(QUERY_SQL);
    ctx.body = {
        data
    };
})


// Insert
router.post('/save', async (ctx, next) => {
    // console.log('I am in /save part line 20 in dataOperation.js');
    const res = ctx.request.body;
    // console.log(res);
    const username = ctx.request.body.username;
    // console.log(`username(mine): ${username}`);
    if (username) {
        const queryData = [username];
        const data = await query(INSERT_SQL, queryData);
        if (data && data.status && data.status === 200) {
            ctx.body = {
                status: 200,
                msg: 'succeed',
            };
        }
        else {
            ctx.body = data;
        }
    }
})


// Update
router.post('/update', async (ctx, next) => {
    // console.log('I am in /update part line 41 in dataOperation.js');
    const res = ctx.request.body;
    const username = ctx.request.body.username;
    const id = ctx.request.body.id;
    if (username && id) {
        const queryData = [username, id];
        const data = await query(UPDATE_SQL, queryData);
        if (data && data.status && data.status === 200) {
            ctx.body = {
                status: 200,
                msg: 'succeed'
            };
        }
        else {
            ctx.body = data;
        }
    }
})

// Delete
router.del('/delete', async (ctx, next)  => {
    // console.log('I am in /del part line 61 in dataOperation.js');
    const res = ctx.request.body;
    const id = ctx.request.body.id;
    if (id) {
        const queryData = [id];
        const data = await query(DELETE_SQL, queryData);
        if (data && data.status && data.status === 200) {
            ctx.body = {
                status: 200,
                msg: "succeed"
            };
        }
        else {
            ctx.body = data;
        }
    }
})

router.post('/signin', async (ctx, next) => {
    let userInfo = ctx.request.body;
    const sql = `select * from userbase where username = ? and password = ?`;
    const queryData = [ctx.request.body.username, ctx.request.body.password];
    const data = await query(sql, queryData);
    if (data.length == 0) {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
    else {
        ctx.response.body = `<h1>Welcome, ${userInfo.username}!</h1>
        <form action="/delUser" method="post">
            <p>Name: <input name="username"></p>
            <p><input type="submit" value="Delete"></p>
        </form>`;
    }
  })

  router.post('/delUser', async (ctx, next) => {
    let userInfo = ctx.request.body;
    const sql = `delete from userbase where username = ?`;
    const queryData = [ctx.request.body.username];
    const data = await query(sql, queryData);
    if (data.length == 0) {
        ctx.response.body = `<h1>delete failed!</h1>`
    }
    else {
        ctx.response.body = `<h1>successfully delete user ${userInfo.username}!</h1>
        <form action="/addUser" method="post">
            <p>Name: <input name="username"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Add"></p>
        </form>`;
    }
  })

  router.post('/addUser', async (ctx, next) => {
    let userInfo = ctx.request.body;
    const sql = `insert into userbase (username, password) values (?, ?)`;
    const queryData = [ctx.request.body.username, ctx.request.body.password];
    const data = await query(sql, queryData);
    if (data.length == 0) {
        ctx.response.body = `<h1>addUser failed!</h1>`
    }
    else {
        ctx.response.body = `<h1>successfully add user ${userInfo.username}!</h1>
        <form action="/updateUser" method="post">
            <p>Name: <input name="username"></p>
            <p>Old Password: <input name="password" type="password"></p>
            <p>new Password: <input name="newpassword" type="password"></p>
            <p><input type="submit" value="UpdatePassword"></p>
        </form>`;
    }
  })

  router.post('/updateUser', async (ctx, next) => {
    let userInfo = ctx.request.body;
    const sql = `update userbase set password = ? where username = ?`;
    const queryData = [ctx.request.body.newpassword, ctx.request.body.username];
    const data = await query(sql, queryData);
    if (data.length == 0) {
        ctx.response.body = `<h1>updatePassword failed!</h1>`
    }
    else {
        ctx.response.body = `<h1>successfully update password ${userInfo.username}!</h1>`
    }
  })

module.exports = router;