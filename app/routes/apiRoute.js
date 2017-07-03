// var Users = require('../models/userModel')

var Users = require('../controllers/apiController')

module.exports = app => {

    // app.delete('/api/user', function(req, res) {

    //     Users.findByIdAndRemove(req.body.id, function(err) {
    //         if (err) throw err;
    //         res.send('SUCCESS');
    //     });
    // });

    app.route('/api/users').get(Users.list).post(Users.upsert).delete(Users.delete);
    app.route('/api/users/:id').get(Users.userById);

}