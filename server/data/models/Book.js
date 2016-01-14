var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    requiredMessage = '{PATH} is required';

module.exports.init = function() {
    var bookSchema = mongoose.Schema({
        bookname: { type: String, require: requiredMessage },
        author: { type: String, require: requiredMessage },
        description: String,
        price:  { type: String, require: requiredMessage },
        category: String,
        image: String,
        timesBought: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    });

    bookSchema.plugin(mongoosePaginate);

    var Book = mongoose.model('Book', bookSchema);
};


