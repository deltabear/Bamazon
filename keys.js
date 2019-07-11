console.log('this is loaded');

exports.mysqlAuth = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}
