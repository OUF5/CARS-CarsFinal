const assert = require('assert');
const request = require('supertest');
const app = require('../app'); // Update this with the correct path to your app.js file
const server = require('../app'); // Update this with the correct path to your server
const mongoose = require('mongoose');
const Account = require('../model/account.model');

describe('Account Model', function() {
  before(function(done) {
    mongoose.connect('mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.once('open', () => {
      console.log('Connected to test database.');
      done();
    }).on('error', (error) => {
      console.error('Error connecting to test database:', error);
    });
  });

  after(function(done) {
    mongoose.connection.close(() => {
      console.log('Disconnected from test database.');
      done();
    });
  });

  it('should create a new account', function(done) {
    const newAccount = new Account({
      email: 'test1@example.com'
      // Add other required fields here for the account
    });

    newAccount.save()
      .then(() => {
        assert(!newAccount.isNew);
        done(); // Call done() to indicate the test is completed
      })
      .catch((error) => {
        console.error('Error creating an account:', error);
        done(error);
      });
  });
});
