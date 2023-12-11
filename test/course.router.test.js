const request = require('supertest');
const { app, server } = require('../app'); // Adjust the path accordingly

describe('GET /:id Route', () => {
  after(async () => {
    // Close the server after all tests are done
    await server.close();
  });

  it('should return 302 if user is not authenticated', (done) => {
    request(app)
      .get('/6573a10c2b022cf3824c62cb') // Replace with an actual ID for testing
      .expect(302)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 200 if user is authenticated', (done) => {
    // Log in or authenticate to simulate an authenticated request
    // For example, you might use supertest's agent to simulate authentication
    const agent = request.agent(app);

    // Perform login/authentication before accessing the route
    agent.post('/login')
      .send({ /* your login credentials */ })
      .expect(200)
      .end((loginErr) => {
        if (loginErr) return done(loginErr);

        // Make a request to the authenticated route
        agent.get('/6573a10c2b022cf3824c62cb') // Replace with an actual ID for testing
          .expect(200)
          .end((routeErr) => {
            if (routeErr) return done(routeErr);
            done();
          });
      });
  });
});
