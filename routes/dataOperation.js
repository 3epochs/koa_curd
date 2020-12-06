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

module.exports = router;