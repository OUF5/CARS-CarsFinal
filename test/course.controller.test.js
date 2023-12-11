
const assert = require('chai').assert;
const app = require('../app'); // Check and replace this with the correct path
const request = require('supertest')(app);
describe('Course Controller', function () {
  it('should get courses for a user', function (done) {
    request(app)
      .get('/courses') // Replace this with the route for getting courses
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Perform assertions on the response
        done();
      });
  });

  it('should get details for a specific course', function (done) {
    request(app)
      .get('/course/123') // Replace this with the route for getting course details
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Perform assertions on the response
        done();
      });
  });
});
