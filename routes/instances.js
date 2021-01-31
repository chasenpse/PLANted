const router = require('express').Router();
const Instance = require('../models/Instance');
const { Op } = require("sequelize");

router.get("/:id", (req,res) => {
    const instances = Instance.findAll({
        where: {
            userId: {
                [Op.eq]: req.params.id
            }
        }
    })
        .then(instances => res.send(instances))
        .catch(err => console.log(err));
});

module.exports = router;