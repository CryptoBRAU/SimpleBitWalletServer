module.exports = {
  logging: true,
  logLevel: 'debug',
  db: {
    url: process.env.MONGODB_URI || 'mongodb://localhost/sbw',
  },
  secrets: {
    jwt: process.env.JWT || 'devJWTSecret',
  },
};
