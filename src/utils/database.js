const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const path = require('path');
const fs = require('fs');
const mongoConnect = (callback) => {
    fs.readFile(path.join(path.dirname(require.main.filename), 'data', 'account.json'), (err, accountData) => {
        if (!err) {
            const accountInfo = JSON.parse(accountData);
            mongoClient.connect(`mongodb+srv://${accountInfo.id}/?retryWrites=true&w=majority`)
                .then(client => {
                    console.log('Connected !!');
                    callback(client);
                })
                .catch(error => {
                    console.log('Error = ', error);
                })
            }
    })

}

module.exports = mongoConnect;