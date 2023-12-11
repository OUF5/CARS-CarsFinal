const assert = require('assert');
const ExpressError = require('../utils/ExpressError'); // Update this path based on your file structure

describe('ExpressError', () => {
    it('should create an instance of ExpressError', () => {
        const message = 'Test error message';
        const statusCode = 404;

        const error = new ExpressError(message, statusCode);

        assert.strictEqual(error instanceof ExpressError, true);
        assert.strictEqual(error.message, message);
        assert.strictEqual(error.statusCode, statusCode);
    });
});
