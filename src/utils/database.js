const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
let loadedDb;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://wwwholakr:ZgoGHxDKqHOEG6Uh@tedjin4.t9owtau.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected !!');
            loadedDb = client.db();
            callback(client);
        })
        .catch(error => {
            console.log('Error = ', error);
            throw error;
        })

}

const getDB = () => {
    if (loadedDb){
        return loadedDb;
    }
    throw 'No Found Database !!';
}
module.exports = {
    mongoConnect,
    getDB
};