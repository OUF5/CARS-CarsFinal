const request = require('supertest');
const { app, server } = require('../app'); // Import your app and server

describe('Account Routes', () => {
  after((done) => {
    server.close(done); // Close the server after all tests are done
  });

  it('should register a new account', (done) => {
    request(app)
      .post('/account/register')
      .send({ email:"email@example.com", password:"myPassword", role:"student" })
      .expect(200) // Assuming successful registration returns 200 OK
      .end(done);
  });

  it('should log in an existing account', (done) => {
    request(app)
      .post('/account/login')
      .send({ email:"email@example.com", password:"myPassword" })
      .expect(200) // Assuming successful login returns 200 OK
      .end(done);
  });

  it('should log out an authenticated user', (done) => {
    request(app)
      .get('/account/logout')
      .expect(302) // Assuming successful logout redirects with status 302
      .end(done);
  });
});
