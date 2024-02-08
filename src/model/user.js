const {getDb} = require('../utils/database');
const mongodb = require('mongodb');

class User {
    constructor(params) {
        this.userId = null;
        this._id = null;
        this.userName = params.userName;
        this.userEmail = params.userEmail;
    }

    save() {
        const user = getDb().collection('users');
        let result;
        if (!this.userId) {
            return user.insertOne(this)
                .then(res => {
                    console.log('save USER', res);
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
                _id: new mongodb.ObjectId(userId)
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
module.exports = {
    User
}