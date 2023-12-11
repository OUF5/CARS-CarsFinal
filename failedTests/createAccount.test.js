const assert = require('assert');
const mongoose = require('mongoose');
const Account = require('../model/account.model');
const createUser = require('../createAccount')

describe('createUser function', function () {
  // Increase the timeout if needed to allow asynchronous operations
  this.timeout(60000); // Set timeout to 10 seconds

  before(function (done) {
    // Connect to MongoDB before running the tests
    mongoose.connect('mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB');
      done();
    });
  });

  after(function (done) {
    // Disconnect from MongoDB after running the tests
    mongoose.connection.close(() => {
      console.log('Disconnected from MongoDB');
      done();
    });
  });

  it('should create a user successfully', function (done) {
    const email = 'test@example.com';
    const password = 'testPassword';
    const role = 'TestRole';

    // Call the createUser function with test data
    createUser(email, password, role);

    // Allow some time for the user creation process (adjust timeout if needed)
    setTimeout(() => {
      // Check if the user exists in the database
      Account.findOne({ email })
        .then((user) => {
          assert.strictEqual(user.email, email);
          assert.strictEqual(user.role, role);
          done();
        })
        .catch((error) => {
          done(error);
        });
    }, 10000); // Wait for 2 seconds before checking (adjust if needed)
  });
});
