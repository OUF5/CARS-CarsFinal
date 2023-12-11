/*
    Middleware for protectecing routes that require being logged in
*/ 
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        return res.redirect('/login');
    }
    next();
}
//check this out @abdulmalik
