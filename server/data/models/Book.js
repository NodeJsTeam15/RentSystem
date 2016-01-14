var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    requiredMessage = '{PATH} is required';

module.exports.init = function() {
    var bookSchema = mongoose.Schema({
        bookname: { type: String, required: requiredMessage },
        author: { type: String, required: requiredMessage },
        description: String,
        price:  { type: String, required: requiredMessage },
        category: String,
        image: {type: String, default: "http://www.twinkl.co.uk/images/default_book_image.gif"},
        timesBought: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    });

    bookSchema.plugin(mongoosePaginate);

    var Book = mongoose.model('Book', bookSchema);
};


