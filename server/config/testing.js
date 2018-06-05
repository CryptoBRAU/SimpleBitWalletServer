module.exports = {
  logging: true,
  logLevel: 'verbose',
  db: {
    url: process.env.MONGODB_URI || 'mongodb://localhost/sbw',
  },
  secrets: {
    jwt: process.env.JWT || 'testingJWTSecret',
  },
};
