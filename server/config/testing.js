module.exports = {
  logging: true,
  logLevel: 'error',
  db: {
    url: process.env.MONGODB_URI || 'mongodb://localhost/sbwtest',
  },
  secrets: {
    jwt: process.env.JWT || 'testingJWTSecret',
  },
};
