const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://wwwholakr:ZgoGHxDKqHOEG6Uh@tedjin4.t9owtau.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected !!');
            callback(client);
        })
        .catch(error => {
            console.log('Error = ', error);
        })

}

module.exports = mongoConnect;