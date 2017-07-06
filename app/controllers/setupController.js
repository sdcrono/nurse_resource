const Users = require('../models/userModel'),
    Profiles = require('../models/profileModel'),
    Roles = require('../models/roleModel'),
    Permissions = require('../models/permissionModel');

handleError = (err) =>
  console.log ("Got an error " + err);

module.exports = function(app){
    app.get('/api/setup', function(req, res){

    let adminAcc = {
        username: "admin",
        password: "admin",
        nurse: true,	
        admin: true,
        created_at: new Date
        
    }

    let userAcc = {
        username: "user",
        password: "user",
        nurse: false,	
        admin: false,
        created_at: new Date,
        updated_at: new Date
        
    }

    let nurseAcc = {
        username: "nurse",
        password: "nurse",
        nurse: true,	
        admin: false,
        created_at: new Date,
        updated_at: new Date
    }

        // Users.create(startUsers, function(err, results){
        //     res.send(results);
        // });

    Users.findOneAndUpdate({username: "admin"}, adminAcc, {upsert:true}, function(err, doc){
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });
    Users.findOneAndUpdate({username: "user"}, userAcc, {upsert:true}, function(err, doc){
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });
    Users.findOneAndUpdate({username: "nurse"}, nurseAcc, {upsert:true}, function(err, doc){
            if (err) return handleError(err);
            // return res.send("succesfully saved");
        });

    Users.findOne({username: 'user'}, function(err, user){
        if(err){
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

        Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, function(err, doc){
            if (err) return handleError(err);
            // return res.send("succesfully saved");
        });
    });

    Users.findOne({username: 'nurse'}, function(err, user){
        if(err){
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

        Profiles.findOneAndUpdate({owner: user._id}, profile, {upsert:true}, function(err, doc){
            if (err) return handleError(err);
            return res.send("succesfully saved");
        });
    });
    
    let loginPer = {
        name: "ROLE_Login",
        description: "Login into the system"
    }

     Permissions.findOneAndUpdate({name: "ROLE_Login"}, loginPer, {upsert:true}, function(err, doc){
            if (err) return handleError(err);
            // return res.send("succesfully saved", {state: req.session.state});
        });

    });
}