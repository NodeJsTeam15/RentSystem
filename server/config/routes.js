var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    // Users
    app.route('/users')
        .get(auth.isInRole('admin'), controllers.users.getAllUsers)
       // .put(auth.isAuthenticated, controllers.users.updateUser);

    app.get('/', function(req, res) {
        res.render('index', {currentUser: req.user});
    });

    app.get('/addbook', auth.isAuthenticated, controllers.books.getBook);
    app.post('/addbook', auth.isAuthenticated, controllers.books.postBook);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};