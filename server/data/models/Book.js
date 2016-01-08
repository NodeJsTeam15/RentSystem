var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

module.exports.init = function() {
    var bookSchema = mongoose.Schema({
        bookname: { type: String, require: true },
        description: String,
        price:  { type: String, require: true }
    });

    //bookSchema.method({
    //    authenticate: function(password) {
    //        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
    //            return true;
    //        }
    //        else {
    //            return false;
    //        }
    //    }
    //});

    var Book = mongoose.model('Book', bookSchema);
};


