const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//create server
const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//listen to port
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

//connect to db
const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/user')(server);
    console.log(`server started on port ${config.PORT}`);
})