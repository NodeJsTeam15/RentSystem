var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {

    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    // Users
    app.get('/users', auth.isInRole('admin'), controllers.users.getAllUsers);
       // .put(auth.isAuthenticated, controllers.users.updateUser);

    app.get('/users/:id',auth.isAdminOrCurrentUser,controllers.users.getById);
        // .post( auth.isInRole('admin'), controllers.users.updateByAdmin)
        // .delete( auth.isInRole('admin'), controllers.users.deleteUser)
        // .put( auth.isInRole('admin'), controllers.users.makeAdmin);
    // Books
    console.log(controllers);
    app.get('/books', controllers.books.getBooks);

    app.get('/cart',  controllers.users.getCart);
    app.get('/cart/add', controllers.users.getAddCartConfirmation);

    app.post('/cart/add', controllers.users.addItemToCart);
    app.post('/cart/remove', controllers.users.removeItemFromCart);
    app.get('/cart/remove', controllers.users.getRemoveFromCartConfirmation);

    app.get('/', controllers.books.getLatestBooks);

    app.get('/books/add', controllers.books.getAdd);
    app.post('/books/add', controllers.books.createBook);

    //app.get('*', function(req, res) {
    //    res.render('index', {currentUser: req.user});
    //});
};