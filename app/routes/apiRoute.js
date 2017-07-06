// var Users = require('../models/userModel')

const Users = require('../controllers/userController'),
    Apis = require('../controllers/apiController');

module.exports = app => {

    // app.delete('/api/user', function(req, res) {

    //     Users.findByIdAndRemove(req.body.id, function(err) {
    //         if (err) throw err;
    //         res.send('SUCCESS');
    //     });
    // });

    app.route('/api/users').get(Users.list).post(Users.upsert).delete(Users.delete);
    app.route('/api/users/:id').get(Users.userById);
    app.route('/api').get(Apis.index);

}