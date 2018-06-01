module.exports = {
  logging: true,
  logLevel: 'verbose',
  db: {
    url: 'mongodb://localhost/sbw'
  },
  secrets: {
    jwt: 'stagingJWTSecret'
  }
};