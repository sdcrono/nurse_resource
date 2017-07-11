const Nurses = require('../controllers/nurse.controller');

module.exports = app => {

    app.route('/api/nurses').get(Nurse.getAll);
}
