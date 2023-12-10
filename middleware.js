/*
    Middleware for protectecing routes that require being logged in
*/ 
module.exports.isLoggedIn = (request, response, next) => {
    if (!request.isAuthenticated()) {
        request.session.returnTo = req.originalUrl
        return response.redirect('/login');
    }
    next();
}
//check this out @abdulmalik
