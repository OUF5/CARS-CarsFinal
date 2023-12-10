const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');


const account = require('../controllers/account.controller');


router.route('/register')
    .get(account.renderRegister)
    .post(catchAsync(account.register));

router.route('/login')
    .get(account.renderLogin)
    .post(passport.authenticate('local', { failureRedirect: '/account/login' }), catchAsync(account.login))

router.get('/logout', account.logout)

module.exports = router;