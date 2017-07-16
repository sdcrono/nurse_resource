const Users = require('../controllers/user.controller'),
    Nurses = require('../controllers/nurse.controller');

module.exports = app => {

    app.route('/api/nurses').get(Nurses.getAll).post(Nurses.upsert).delete(Users.deactive);
    app.route('/api/nurses/:id').get(Nurses.getById,Nurses.getMetaById);
}
