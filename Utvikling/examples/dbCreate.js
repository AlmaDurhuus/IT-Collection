//Workbench to Sqlite

const db = require("better-sqlite3")()
const sql = `
 SQL script goes here
`
db.exec(sql);

// get sql script  from mySQL Workbench
// Tools → Catalog → Export SQlite CREATE script
