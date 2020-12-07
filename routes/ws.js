const router = require('koa-router')();
const fs = require('fs');

let wsObj = {};

router.all('/ws', (ctx) => {
	// 客户端链接传过来的客户端身份
	const { id } = ctx.query;
	// 将链接保存起来
	wsObj[id] = ctx;
	// 给客户端发送链接成功信息
	ctx.websocket.send('连接成功');
	// 监听客户端发送过来的信息
	ctx.websocket.on('message', (message) => {
		// uid为发送方，将接收到的信息发送给接收方sendid
		const sendid = JSON.parse(message).sendid;
		if (!wsObj[sendid]) {
			ctx.websocket.send(`${sendid}未上线`);
		} else {
			wsObj[sendid].websocket.send(message);
		}
	});

	// 连接关闭
	ctx.websocket.addEventListener('close', () => {
		ctx.websocket.close();
		console.log('websocket closed');
	});
});

module.exports = router;