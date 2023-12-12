const Account = require('../model/account.model');

module.exports.renderRegister = (request, response) => {
    response.render('account/register');
}

module.exports.register = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        const account = new Account({ email });
        const registeredAccount = await Account.register(account, password);

        request.login(registeredAccount, err => {
            if (err) return next(err);
            response.redirect('/dashboard');
        })
    } catch (e) {
        response.redirect('register');
    }
}

module.exports.renderLogin = async (request, response) => {
    account = await Account.findOne({ email: '219110085@psu.edu.sa' });
    response.render('account/pages-login');
}

module.exports.login = async (request, response) => {
    const redirectUrl = request.session.returnTo || '/dashboard';
    delete request.session.returnTo;
    response.redirect(redirectUrl);
}


module.exports.logout = (request, response, next) => {
    request.logout(function(err) {
    if (err) { return next(err); }
        response.redirect('/');
    });
}