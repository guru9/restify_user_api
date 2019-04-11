const errors = require('restify-errors');
const User = require('../models/User');

module.exports = server => {

    //Get users
    server.get('/users', async (req, res, next) => {
        try {
            const users = await User.find({});
            res.send(users);
            next();
        }
        catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    //add user
    server.post('/users', async (req, res, next) => {
        //Check for json
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects `application/json`"));
        }

        const { name, email, balance } = req.body;

        const user = new User({
            name, email, balance
        });

        try {
            await user.save();
            res.send(201);
            next();
        }
        catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
}