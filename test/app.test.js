const request = require('supertest');
const { app, server } = require('../app'); // Import both the app and server objects

describe('GET /dashboard', () => {
  after(() => {
    server.close(); // Close the server after testing
  });

  it('responds with status 200 when authenticated', (done) => {
    request(app)
      .get('/dashboard')
      // Add necessary authentication headers or cookies
      .expect(200, done);
  });

  it('responds with redirect (status 302) when not authenticated', (done) => {
    request(app)
      .get('/dashboard')
      // Add necessary authentication headers or cookies
      .expect(302, done);
  });
});
