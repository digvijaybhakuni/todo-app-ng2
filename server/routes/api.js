const express = require('express');
const router = express.Router();

function init(wagner){

    router.get("/tasks", wagner.invoke(function(Task) {
        return (req, res) => {
                Task.find({}).exec((err, tasks) => {
                    if(err){
                        return res.status(500).json({ error: err.toString() });
                    }else if(!tasks){
                        return res.status(404).json({ error: 'Not found' });
                    }
                    res.json({tasks: tasks});
                });
            };
        })
     );

    router.get("/users", wagner.invoke(function(User) {
        return (req, res) => {
                User.find({})
                    .then((users) => {
                         if(!users){
                            return res.status(404).json({ error: 'Not found' });
                        }
                        res.json({users: users});
                    }).catch((err) => {
                        return res.status(500).json({ error: err.toString() });
                    });
            };
        })
     );
}


module.exports = function (wagner){ 
    init(wagner); 
    return router;
};