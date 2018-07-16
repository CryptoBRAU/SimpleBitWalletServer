/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */
const authController = require('./authController');

describe('Authentication Constroller API', () => {
  it('Should get an error when signin', async () => {
    const req = { user: {} };
    const res = jest.fn();
    const next = jest.fn();
    authController.signin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
