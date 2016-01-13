var Book = require('mongoose').model('Book'),
    mongoose=require('mongoose');

module.exports = {
    create: function(book, callback) {
        Book.create(book, callback);
    },
    getLatestBooks: function (callback) {
        Book.find()
            // the sort parameter will be dateOfCreation or rating
            .sort('name')
            .limit(10)
            .exec(callback);
    },
    getBookById: function(id, callback){
        var idToSearch=mongoose.Types.ObjectId(id);
        Book.findById(idToSearch, callback);
    }
};