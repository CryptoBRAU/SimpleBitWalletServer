const request = require('supertest');

const createUser = async (app, newUser) => request(app)
  .post('/api/users')
  .send(newUser)
  .then(response => response.body);

module.exports = {
  createUser,
};
