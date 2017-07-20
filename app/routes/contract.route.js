const Contracts = require('../controllers/contract.controller');

module.exports = app => {

    app.route('/api/contracts').get(Contracts.getAll).post(Contracts.upsert);

}