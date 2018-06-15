/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const request = require('supertest');
const app = require('../../server');
const userUtil = require('../../../tests/utils/util.user.integration');
require('../../../tests/setup');

let createdUser;
const user = {
  username: 'testUsername',
  password: 'pass',
};

describe('User API', () => {
  it('Should create an user', async () => {
    createdUser = await userUtil.createUser(app, user);
    expect(createdUser.username).toEqual(user.username);
    expect(createdUser.password).toBeUndefined();
    expect(createdUser.token).toBeDefined();
  });

  it('Should find all users', async (done) => {
    const user2 = {
      username: 'testUsername2',
      password: 'pass',
    };
    createdUser = await userUtil.createUser(app, user);
    const createdUser2 = await userUtil.createUser(app, user2);
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const users = response.body;
        expect(users).toBeDefined();
        expect(users).toHaveLength(2);
        expect(createdUser.username).toEqual(user.username);
        expect(createdUser2.username).toEqual(user2.username);
        done();
      });
  });

  it('Should find an user', async (done) => {
    createdUser = await userUtil.createUser(app, user);
    request(app)
      .get(`/api/users/${createdUser._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const foundUser = response.body;
        expect(foundUser).toBeDefined();
        expect(foundUser._id).toEqual(createdUser._id);
        expect(foundUser.username).toEqual(createdUser.username);
        done();
      });
  });

  it('Should update an user', async (done) => {
    createdUser = await userUtil.createUser(app, user);
    const updatedUsername = 'testUsername1004';
    request(app)
      .put(`/api/users/${createdUser._id}`)
      .send({ username: updatedUsername })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${createdUser.token}`)
      .expect(200)
      .then((response) => {
        const foundUser = response.body;
        expect(foundUser).toBeDefined();
        expect(foundUser._id).toEqual(createdUser._id);
        expect(foundUser.username).toEqual(updatedUsername);
        done();
      });
  });

  it('Should find me', async (done) => {
    createdUser = await userUtil.createUser(app, user);
    request(app)
      .get('/api/users/me')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${createdUser.token}`)
      .expect(200)
      .then((response) => {
        const me = response.body;
        expect(me).toBeDefined();
        expect(me._id).toEqual(createdUser._id);
        expect(me.username).toEqual(createdUser.username);
        done();
      });
  });

  it('Should get an error when try to create the user more than once', async () => {
    const newUser = {
      username: 'testUsername',
      password: 'pass',
    };
    request(app)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(403);
  });
});
