var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    mongoosePaginate = require('mongoose-paginate'),
    forbiddenCharacters = [' ', '<', '>', '(', ')', ','],
    userNameMinlength = [5, 'The `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: {
            type: String,
            required: '{PATH} is required',
            minlength: userNameMinlength,
            unique: true,
            validate: {
                validator: function (val) {
                    'use strict';
                    var containsForbiddenCharacters = forbiddenCharacters.some(
                        function (item) {
                            return (val.indexOf(item) > -1);
                        }
                    );

                    return !containsForbiddenCharacters;
                },
                message: 'Username (`{VALUE}`) should not contain invalid characters!'
            }
        },
        salt: String,
        hashPass: String,
        roles: [String],
        city: {
            type: String,
            validate: {
                validator: function (val) {
                    'use strict';
                    var containsForbiddenCharacters = forbiddenCharacters.some(
                        function (item) {
                            return (val.indexOf(item) > -1);
                        }
                    );

                    return !containsForbiddenCharacters;
                },
                message: 'City (`{VALUE}`) should not contain invalid characters!'
            }
        },
        firstName: {
            type: String,
            validate: {
                validator: function (val) {
                    'use strict';
                    var containsForbiddenCharacters = forbiddenCharacters.some(
                        function (item) {
                            return (val.indexOf(item) > -1);
                        }
                    );

                    return !containsForbiddenCharacters;
                },
                message: 'First name (`{VALUE}`) should not contain invalid characters!'
            }
        },
        lastName: {
            type: String,
            validate: {
                validator: function (val) {
                    'use strict';
                    var containsForbiddenCharacters = forbiddenCharacters.some(
                        function (item) {
                            return (val.indexOf(item) > -1);
                        }
                    );

                    return !containsForbiddenCharacters;
                },
                message: 'Last name (`{VALUE}`) should not contain invalid characters!'
            }
        },
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


