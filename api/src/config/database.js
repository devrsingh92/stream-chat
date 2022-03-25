const mongoose = require('mongoose');

const connectDatabase = () => {

    const dbName = process.env.DB_NAME;
    // const MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}`;
    const MONGODB_URI = `mongodb://localhost:27017/${dbName}`;

    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB connected with HOST: ${con.connection.host}`)
    });

}

module.exports = connectDatabase;