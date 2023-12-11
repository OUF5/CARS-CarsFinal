const assert = require('assert');
const expressAsyncHandler = require('../utils/catchAsync'); // Update this path based on your file structure

describe('expressAsyncHandler', () => {
    it('should return a function', () => {
        const middleware = expressAsyncHandler(() => {});
        assert.strictEqual(typeof middleware, 'function');
    });

    it('should handle async functions and call next on error', (done) => {
        const error = new Error('Test error');
        const middleware = expressAsyncHandler(async (req, res, next) => {
            throw error;
        });

        middleware({}, {}, (err) => {
            assert.strictEqual(err, error);
            done();
        });
    });

    it('should handle async functions and call next on success', (done) => {
        const middleware = expressAsyncHandler(async (req, res, next) => {
            res.status(200).send('Success');
        });

        middleware({}, {
            status: function (statusCode) {
                assert.strictEqual(statusCode, 200);
                return this;
            },
            send: function (message) {
                assert.strictEqual(message, 'Success');
                done();
            }
        }, done);
    });
});
