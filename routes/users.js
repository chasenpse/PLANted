const router = require('express').Router();
const User = require('../models/User');
const { Op } = require("sequelize");

router.get('/', (req,res) => {
    res.send({get: 'hello'});
});

router.get("/:id", (req,res) => {
    const users = User.findAll({
        where: {
            id: {
                [Op.eq]: req.params.id
            }
        }
    })
        .then(users => res.send(users))
        .catch(err => console.log(err));
});

router.post("/register", (req,res) => {
    res.send({
        register: "yes",
    });
});

module.exports = router;