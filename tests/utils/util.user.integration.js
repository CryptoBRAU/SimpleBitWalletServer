/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const request = require('supertest');

const createUser = (app, newUser) => request(app)
  .post('/api/users')
  .send(newUser)
  .then(response => response.body);

const deleteUser = (app, user) => request(app)
  .delete(`/api/users/${user._id}`)
  .set('Authorization', `Bearer ${user.token}`)
  .then(response => response.body);

module.exports = {
  createUser,
  deleteUser,
};
