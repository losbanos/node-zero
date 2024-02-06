const {getDb} = require('../utils/database');
const mongodb = require('mongodb');

class User {
    constructor(params) {
        this.userId = params.userId;
        this.userName = params.userName;
        this.email = params.email;
    }

    save() {
        const user = getDb().collection('users');
        let result;
        if (!this.userId) {
            return user.insertOne(this)
                .then(res => {
                    console.log('save USER');
                })
                .catch(e => {
                    console.error(e);
                })
        } else {

        }
    }

    static findById(userId) {
        return getDb()
            .collection('users')
            .find({
                id: new mongodb.ObjectId(userId)
            })
            .next()
            .then(res => {
                console.log('find use by id');
            })
            .catch(e => {
                console.error(e)
            });
    }
}