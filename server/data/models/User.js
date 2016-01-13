var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    mongoosePaginate = require('mongoose-paginate');

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: { type: String, require: '{PATH} is required', unique: true },
        salt: String,
        hashPass: String,
        roles: [String],
        city: String,
        firstName: String,
        lastName: String,
        imageUrl: String,
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] ,
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
    });

    userSchema.plugin(mongoosePaginate);

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
};


