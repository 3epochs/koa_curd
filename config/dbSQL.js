const QUERY_SQL = `select * from user`;
const INSERT_SQL = `insert into user(id,username) values(0,?)`;
const UPDATE_SQL = `update user set username=? where id=?`;
const DELETE_SQL = `delete from user where id=?`;

module.exports = {QUERY_SQL, INSERT_SQL, UPDATE_SQL, DELETE_SQL};