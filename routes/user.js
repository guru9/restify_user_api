const errors = require('restify-errors');
const User = require('../models/User');

module.exports = server => {

    //get users
    server.get('/users', async (req, res, next) => {
        try {
            const users = await User.find({});
            res.send(users);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    //get single user
    server.get('/users/:id', async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.send(user);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no user with id of ${req.params.id}`));
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
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });

    //update user
    server.put('/users/:id', async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no user with id of ${req.params.id}`));
        }
    });

    //delete user
    server.del('/users/:id', async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            res.send(204);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no userwith id of ${req.params.id}`))
        }
    })

}