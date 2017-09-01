const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const auth = jwt({
    secret: 'SECRET_X',
    userProperty: 'payload'
});

function init(wagner) {

    router.get("/tasks", auth, wagner.invoke(function (Task) {
        return (req, res) => {
            console.log("req.payload._id", req.payload._id);
            Task.find({ $or: [{ "metadata.createBy": req.payload._id }, { "metadata.modifiedBy": req.payload._id }] }).exec((err, tasks) => {
                if (err) {
                    return res.status(500).json({ error: err.toString() });
                } else if (!tasks) {
                    return res.status(404).json({ error: 'Not found' });
                }
                res.json({ tasks: tasks });
            });
        };
    })
    );

    router.post("/tasks", auth, wagner.invoke(function (Task) {
        return (req, res) => {
            console.log("req.payload._id", req.payload._id);
            var task = new Task(req.body);
            task.setOwner(req.payload.username, req.payload._id);
            task.metadata.createBy = req.payload._id;
            task.metadata.modifiedBy = req.payload._id;
            task.metadata.createDate = new Date();
            task.metadata.modifiedDate = new Date();
            task.save((err) => {
                if (err) {
                    return res.status(500).json({ error: err.toString() });
                }
                res.json(task);
            });

            //console.log("req", req);

            /*            Task.create(req.body).exec((err, task) => {
                            if(err){
                                return res.status(500).json({ error: err.toString() });
                            }else if(!tasks){
                                return res.status(404).json({ error: 'Not found' });
                            }
                            res.json({task: task});
                        });*/
        }
    }));

    router.get("/users/:id", auth, wagner.invoke(function (User) {
        return (req, res) => {
            //console.log("req.payload._id", req.payload._id);
            //console.log("req.payload.username", req.payload.username);
            
            userId = mongoose.Types.ObjectId(req.params.id);
            User.findOne({_id:userId})
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ error: 'Not found' });
                    }
                    user.data = {};
                    res.json(user);
                }).catch((err) => {
                    return res.status(500).json({ error: err.toString() });
                });
        };
    })
    );

    router.post("/users/:id", auth, wagner.invoke(function (User) {
        return (req, res) => {
            var user = new User(req.body);
            userId = mongoose.Types.ObjectId(req.params.id);
            Console.log("TESST");
            User.findOne({_id:userId})
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ error: 'Not found' });
                    }
                    res.json(user);
                }).catch((err) => {
                    return res.status(500).json({ error: err.toString() });
                });
        };
    })
    );

    router.get("/users", auth, wagner.invoke(function (User) {
        return (req, res) => {
            User.find({})
                .then((users) => {
                    if (!users) {
                        return res.status(404).json({ error: 'Not found' });
                    }
                    res.json({ users: users });
                }).catch((err) => {
                    return res.status(500).json({ error: err.toString() });
                });
        };
    })
    );

    router.post("/users", wagner.invoke(function (User) {
        return (req, res) => {
            console.log("saving User");
            var user = new User(req.body);
            //user.metadata.createBy = task.owner.id;
            //user.metadata.modifiedBy = task.owner.id;
            //user.metadata.modifiedDate = new Date();
            //user.metadata.createDate = new Date();
            user.setPassword(user.data.password);
            console.log("hash password", user.data.password);
            user.save((err) => {
                if (err) {
                    return res.status(500).json({ error: err.toString() });
                }
                user.data.password = "";
                res.json(user);
            });
        }
    }));

    router.post("/auth", wagner.invoke(function (User) {
        return (req, res) => {
            let username = req.body.username;
            let rawPassword = req.body.password;
            User.find({ 'profile.username': username })
                .then((users) => {
                    console.log("users ", users);
                    if (users && users.length > 0) {
                        let user = users.pop();
                        if (user.validPassword(rawPassword)) {
                            user.data.password = "";
                            return res.json({ token: user.generateJwt() });
                        }
                    }
                    return res.status(401).json({ 'error': 'User is not valid' });
                }).catch((err) => {
                    console.error("error", err);
                    return res.status(500).json({ error: err.toString() });
                });
        }
    }));
}


module.exports = function (wagner) {
    init(wagner);
    return router;
};