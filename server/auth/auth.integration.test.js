/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const request = require('supertest');
const app = require('../server');
const userUtil = require('../../tests/utils/util.user.integration');
require('../../tests/setup');

describe('Authentication API', () => {
  it('Should signin', async (done) => {
    const user = {
      username: 'testUsername',
      password: 'pass',
    };
    const createdUser = await userUtil.createUser(app, user);
    request(app)
      .post('/auth/signin')
      .send(user)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const loggedUser = response.body;
        expect(loggedUser).toBeDefined();
        expect(loggedUser._id).toEqual(createdUser._id);
        expect(loggedUser.username).toEqual(createdUser.username);
        expect(loggedUser.token).toEqual(createdUser.token);
        done();
      });
  });

  it('Should not signin and receive invalid username and/or password', (done) => {
    const user = {
      username: 'testUsername',
      password: 'wrongPass',
    };
    request(app)
      .post('/auth/signin')
      .send(user)
      .set('Accept', 'application/json')
      .expect(401)
      .then((response) => {
        expect(response.error).toBeDefined();
        expect(response.error.text).toEqual('Invalid username and/or password');
        done();
      });
  });

  it('Should not signin and receive you need an username and password', (done) => {
    const user = {
      username: 'testUsername1000',
    };
    request(app)
      .post('/auth/signin')
      .send(user)
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        expect(response.error).toBeDefined();
        expect(response.error.text).toEqual('You need an username and password');
        done();
      });
  });
});
