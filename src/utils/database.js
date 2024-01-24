const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const path = require('path');
const fs = require('fs');
let db;
const mongoConnect = (callback) => {
    fs.readFile(path.join(path.dirname(require.main.filename), 'data', 'account.json'), (err, accountData) => {
        if (!err) {
            const accountInfo = JSON.parse(accountData);
            mongoClient.connect(`mongodb+srv://${accountInfo.id}/shop?retryWrites=true&w=majority`, {
                tlsAllowInvalidHostnames: true,
                tlsAllowInvalidCertificates: true
            })
            .then(client => {
                console.log('Connected !!');
                db = client.db();
                callback(client);
            })
            .catch(error => {
                console.log('Error = ', error);
            })
            }
    })
    // fs.readFileSync('data', 'utf-8', (error, accountData) => {
    //     if (!error) {
    //
    //     }
    // })
}

const getDb = () => {
    if (db) {
        return db;
    }

    throw 'No Database Found';
}

module.exports = {
    mongoConnect,
    getDb
};