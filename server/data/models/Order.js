var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

module.exports.init = function () {
    var bookSchema = new mongoose.Schema({
        price: Number,
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });

    bookSchema.plugin(mongoosePaginate);

    var Book = mongoose.model('Order', bookSchema);
};