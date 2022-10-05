const { connect, connection } = require('mongoose');



connect(connectionString, {
    useNewParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;