class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); // error parent class variables initializations
        this.message = message;
        this.statusCode = statusCode;
    }
}
// throw new ExpressError(message, statusCode);

module.exports = ExpressError;