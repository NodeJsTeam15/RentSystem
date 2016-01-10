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

    app.get('/users/:id', auth.isAdminOrCurrentUser, controllers.users.getById)
    app.get('/users/:id/edit',auth.isAdminOrCurrentUser, controllers.users.getByIdForEdit);
    app.put('/users/:id/edit', controllers.users.updateByAdmin)
        // .delete( auth.isInRole('admin'), controllers.users.deleteUser)
        // .put( auth.isInRole('admin'), controllers.users.makeAdmin);

    app.get('/', function(req, res) {
        res.render('index', {currentUser: req.user});
    });

    app.get('/addbook', auth.isAuthenticated, controllers.books.getBook);
    app.post('/addbook', auth.isAuthenticated, controllers.books.postBook);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};