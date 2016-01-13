var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

module.exports.init = function() {
    var bookSchema = mongoose.Schema({
        name: { type: String, require: true },
        description: String,
        price:  { type: String, require: true },
        category: String,
        image: String,
        timesBought: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    });

    bookSchema.plugin(mongoosePaginate);

    var Book = mongoose.model('Book', bookSchema);
};


