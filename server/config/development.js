module.exports = {
  logging: true,
  logLevel: 'debug',
  db: {
    url: 'mongodb://localhost/sbw'
  },
  secrets: {
    jwt: 'devJWTSecret'
  }
};