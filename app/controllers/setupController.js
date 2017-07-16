const Users = require('mongoose').model('Users'),
    Profiles = require('mongoose').model('Profiles'),
    Roles = require('mongoose').model('Roles'),
    Permissions = require('mongoose').model('Permissions'),
    bcrypt = require('bcryptjs');

handleError = (err) =>
    console.log("Got an error " + err);

module.exports = function (app) {
    app.get('/api/setup', function (req, res) {

        let adminAcc = {
            username: "admin",
            password: bcrypt.hashSync("admin", 10),
            role: "ROLE_Admin",
            nurse: true,
            admin: true,
            created_at: new Date

        }

        let userAcc = {
            username: "user",
            password: bcrypt.hashSync("user", 10),
            role: "ROLE_User",
            nurse: false,
            admin: false,
            created_at: new Date,
            updated_at: new Date

        }

        let nurseAcc = {
            username: "nurse",
            password: bcrypt.hashSync("nurse", 10),
            role: "ROLE_Nurse",
            nurse: true,
            admin: false,
            created_at: new Date,
            updated_at: new Date
        }

        // Users.create(startUsers, function(err, results){
        //     res.send(results);
        // });

        Users.findOneAndUpdate({ username: "admin" }, adminAcc, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });
        Users.findOneAndUpdate({ username: "user" }, userAcc, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });
        Users.findOneAndUpdate({ username: "nurse" }, nurseAcc, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved");
        });

        Users.findOne({ username: 'user' }, function (err, user) {
            if (err) {
                return handleError(err);
            }
            var profile = {
                name: "Thinh",
                email: "abc@gmail.com",
                phone: "01217366366",
                age: 18,
                sex: "female",
                address: "String",
                owner: user._id
            }

            Profiles.findOneAndUpdate({ owner: user._id }, profile, { upsert: true }, function (err, doc) {
                if (err) return handleError(err);
                // return res.send("succesfully saved");
            });
        });

        Users.findOne({ username: 'nurse' }, function (err, user) {
            if (err) {
                return handleError(err);
            }

            var profile = {
                name: "Thu",
                email: "xyz@gmail.com",
                phone: "01217333333",
                age: 20,
                sex: "female",
                address: "String",
            }

            Profiles.findOneAndUpdate({ owner: user._id }, profile, { upsert: true }, function (err, doc) {
                if (err) return handleError(err);
                return res.send("succesfully saved");
            });
        });

        let adminRole = {
            name: "ROLE_Admin",
            description: "Admin role",
            permissions: [
                "PERM_Login",
                "PERM_Manage",
                "PERM_Search",
                "PERM_Contact"
            ]
        }

        let userRole = {
            name: "ROLE_User",
            description: "User role",
            permissions: [
                "PERM_Login",
                "PERM_Search",
                "PERM_Contact"
            ]
        }

        let nurseRole = {
            name: "ROLE_Nurse",
            description: "Nurse role",
            permissions: [
                "PERM_Login",
                "PERM_Contact"
            ]
        }

        let loginPer = {
            name: "PERM_Login",
            description: "Login into the system"
        }

        let managePer = {
            name: "PERM_Manage",
            description: "Manage users in the system"
        }

        let searchPer = {
            name: "PERM_Search",
            description: "Search nurses in the system"
        }

        let contactPer = {
            name: "PERM_Contact",
            description: "Contact who make a contract"
        }

        Roles.findOneAndUpdate({ name: "ROLE_Admin" }, adminRole, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

        Roles.findOneAndUpdate({ name: "ROLE_User" }, userRole, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

        Roles.findOneAndUpdate({ name: "ROLE_Nurse" }, nurseRole, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });


        Permissions.findOneAndUpdate({ name: "PERM_Login" }, loginPer, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

        Permissions.findOneAndUpdate({ name: "PERM_Manage" }, managePer, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

        Permissions.findOneAndUpdate({ name: "PERM_Search" }, searchPer, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

        Permissions.findOneAndUpdate({ name: "PERM_Contact" }, contactPer, { upsert: true }, function (err, doc) {
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

    });
}