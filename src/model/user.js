const {getDb} = require('../utils/database');
const mongodb= require('mongodb');
const {ObjectId} = mongodb;

class User {
    constructor(params = {userId: null, _id: null, userName: '', userEmail: '', regDate: Date.now(), cart: {items:[]}}) {
        this.userId = params.userId;
        this._id = params._id;
        this.userName = params.userName;
        this.userEmail = params.userEmail;
        this.regDate = params.regDate;
        this.cart = params.cart;
    }

    save() {
        const user = getDb().collection('users');
        if (!this.userId) {
            return user.insertOne(this)
                .then(res => {
                    console.log('save USER', res);
                    this.userId = this._id = res._id;
                    return res;
                })
                .catch(e => {
                    console.error(e);
                    return e;
                })
        } else {

        }
    }

    addToCart(product) {
        const exitedProductIndex = this.cart.items.findIndex(item => {
            return item.productId.toString() === product._id.toString();
        });
        const updatedCartItems = [...this.cart.items];
        if (exitedProductIndex >= 0) {
            updatedCartItems[exitedProductIndex].quantity += 1;

        } else {
            updatedCartItems.push({productId: product._id, quantity: 1});
        }

        const updatedCart = {items: updatedCartItems};
        return getDb().collection('users')
            .updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
            .then(result => {
                console.log('add to cart success');
                return result
            })
            .catch(e => e);

    }
    static findById(userId) {
        return getDb()
            .collection('users')
            .find({
                _id: new ObjectId(userId)
            })
            .next()
            .then(res => {
                console.log('find use by id');
                return res;
            })
            .catch(e => {
                console.error(e)
            });
    }

    static fetchAll() {
        return getDb()
            .collection('users')
            .find()
            .toArray()
            .then(result => {
                console.log('find user all');
                return result;
            })
            .catch(e => console.error(e));
    }
}
module.exports = {
    User
}