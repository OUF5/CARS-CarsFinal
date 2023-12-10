/*
    Requiring npms  
*/

const express = require('express'); // Server
const path = require('path'); // Absulute Paths
const mongoose = require('mongoose'); // DB
const methodOverride = require('method-override'); // Access to all RESTful Routes methods
const session = require('express-session');
const MongoDBStore = require("connect-mongo"); // for storing sessions in mongo

/*
    Requiring Utilities, Classes and Functions: 
*/
const ExpressError = require('./utils/ExpressError'); 

/*
    Requiring Authentication:  
*/
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Account = require('./model/account.model');


/*
    Requiring Routes:  
*/
const accountRouter = require('./routes/account.router');
const courseRouter = require('./routes/course.router');


const dbUrl = 'mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the MongoDB Atlas');
});


/*
    Sessions Confg: 
*/
// process.env.SECRET is set on the deployment side, such as heroku
const secret = 'thisshouldbeabettersecret!'; // sec secret for dev.

const sessionConfig = {
    secret: secret,
    resave: false,
    saveUninitialized: true,
	
    store: MongoDBStore.create({ //storing sessions in mongo, as a collection 
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60
    }),
    cookie: {
        httpOnly: true, // Security 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Ends After a week
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};

// Starting express server
const app = express();

/* 
    app config 
*/
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.use(session(sessionConfig));

/*
    Passwords: methods and middlewares
*/
app.use(passport.initialize());
app.use(passport.session()); // must be executed after starting the session
passport.use(new LocalStrategy({
  usernameField: 'email'
}, Account.authenticate()));

passport.serializeUser(Account.serializeUser()); // How to add the user to the session
passport.deserializeUser(Account.deserializeUser()); // How to delete the user from the session

app.use('/account', accountRouter);
app.use('/course', courseRouter);

const catchAsync = require('./utils/catchAsync');
const courseController = require('./controllers/course.controller');
const { isLoggedIn } = require('./middleware');

app.get('/dashboard', isLoggedIn, catchAsync(courseController.getCourses));

app.get('', async (request, response) => {
    return response.render("landing")
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Started on port ' + PORT);
});
