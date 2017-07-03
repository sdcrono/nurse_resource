var Users = require('../controllers/userController'),
    Logins = require('../controllers/loginController')

module.exports = app => {
    app.route('/register').post(Users.insert);
    app.route('/').get(Logins.index);
}