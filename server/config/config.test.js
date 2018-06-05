const config = require('./config');

describe('Config.js', () => {
  it('Should load the test environment as config file', () => {
    process.env.NODE_ENV = 'test';
    expect(config.env).toEqual('testing');
    expect(config.secrets.jwt).toEqual('testingJWTSecret');
  });

  it('Should load the dev environment as config file', () => {
    process.env.NODE_ENV = 'dev';
    config.init();
    expect(config.env).toEqual('development');
    expect(config.secrets.jwt).toEqual('devJWTSecret');
  });
});
