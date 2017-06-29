var Users = require('../models/userModel'),
    Profiles = require('../models/profileModel');

handleError = (err) =>
  console.log ("Got an error " + err);

module.exports = function(app){
    app.get('/api/setup', function(req, res){
        // var startUsers = [
        //     {
        //         username: "admin",
        //         password: "admin",
        //         nurse: true,	
        //         admin: true,
        //         created_at: new Date
                
        //     },
        //     {
        //         username: "user",
        //         password: "user",
        //         // profile: {
        //         //     name: "Thi",
        //         //     email: "abc@gmail.com",
        //         //     phone: 01217366366,
        //         //     age: 18,	
        //         //     sex: "female",
        //         //     address: "String",
        //         //     owner: {
        //         //         "$oid": "5950de622fc7de03481c79b6"
        //         //     }
        //         // },
        //         nurse: false,	
        //         admin: false,
        //         created_at: new Date,
        //         updated_at: new Date
                
        //     },
        //     {
        //         username: "nurse",
        //         password: "nurse",
        //         // profile: {
        //         //     name: "Thu",
        //         //     email: "xyz@gmail.com",
        //         //     phone: 01217333333,
        //         //     age: 20,	
        //         //     sex: "female",
        //         //     address: "String",
        //         //     owner: {
        //         //         "$oid": "5950de622fc7de03481c79b7"
        //         //     }
        //         // },
        //         nurse: true,	
        //         admin: false,
        //         created_at: new Date,
        //         updated_at: new Date
        //     },
        // ];

    var adminAcc = {
        username: "admin",
        password: "admin",
        nurse: true,	
        admin: true,
        created_at: new Date
        
    }

    var userAcc = {
        username: "user",
        password: "user",
        nurse: false,	
        admin: false,
        created_at: new Date,
        updated_at: new Date
        
    }

    var nurseAcc = {
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
    


        // var id = Users.findOne({'username': 'user'}, function(err, user){
        //     if(err){
        //         return handleError(err);
        //     }


        //     console.log("id, ten, mk:" + user._id + ";" + user.username + ";" + user.password);
        // })._id;

        // var profile = {
        //         name: "Thi",
        //         email: "xyz@gmail.com",
        //         phone: "01217366366",
        //         age: 18,	
        //         sex: "female",
        //         address: "String",
        //         owner: id 
        //     }

        // Profiles.findOneAndUpdate({owner: id}, profile, {upsert:true}, function(err, doc){
        //     if (err) return handleError(err);
        //     return res.send("succesfully saved");
        // });

        // Users.findOne({'username': 'nurse'}, function(err, user){
        //     if(err){
        //         return handleError(err);
        //     }
        //     var profile = {
        //             name: "Thu",
        //             email: "xyz@gmail.com",
        //             phone: "01217333333",
        //             age: 20,	
        //             sex: "female",
        //             address: "String",
        //         }   
        //     // Profiles.create(profile, function(err, results){
        //     //     res.send(results);
        //     // });
        //     console.log("id, ten, mk:" + user._id + ";" + user.username + ";" + user.password);
        // });

        // var startProfiles = [
        //         {
        //             name: "Thi",
        //             email: "abc@gmail.com",
        //             phone: 01217366366,
        //             age: 18,	
        //             sex: "female",
        //             address: "String",
        //             owner: Users.findOne({username: 'user'}, function(err, obj){
        //                 if(err){
        //                     console.log(err);
        //                 }
        //                 console.log(obj);
        //             })._id
        //         },
             
        //         {
        //             name: "Thu",
        //             email: "xyz@gmail.com",
        //             phone: 01217333333,
        //             age: 20,	
        //             sex: "female",
        //             address: "String",
        //             owner: Users.findOne({username: 'nurser'}, function(err, obj){
        //                 if(err){
        //                     console.log(err);
        //                 }
        //                 console.log(obj);
        //             })._id
        //         }        
        // ];

        // Profiles.create(startProfiles, function(err, results){
        //     res.send(results);
        // });

    });
}