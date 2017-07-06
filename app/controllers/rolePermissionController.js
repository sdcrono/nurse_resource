const Permissions = require('../models/permissionModel');

exports.listPermission = (req, res) => 
        Permissions.find({ name: "ROLE_Login" },
        (err, permission) => {
            if (err) throw err;
            res.send(permission);
        });