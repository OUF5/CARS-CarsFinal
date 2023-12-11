// Import necessary modules for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../app'); // Modify the path as per your project structure

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

describe('Middleware - isLoggedIn', () => {
  after(() => {
    // Close the server after tests
    server.close();
  });

  it('should redirect to login page if user is not authenticated', (done) => {
    chai.request(app)
      .get('/login') // Replace with the route that requires authentication
      .end((err, res) => {
        expect(res).to.have.status(302); // Replace with the expected redirection status
        done();
      });
  });

  it('should call next() if user is authenticated', (done) => {
    chai.request(app)
      .get('/dashoard') // Replace with an authenticated route
      .end((err, res) => {
        expect(res).to.have.status(200); // Replace with the expected status for authenticated access
        done();
      });
  });
});
