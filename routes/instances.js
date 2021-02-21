const router = require('express').Router();
const db = require('../config/db');

router.get("/:id", (req,res) => {
    db.instances.findAll({
        where: {
            userId: req.params.id
        },
        include: {
            model: db.crops,
            attributes: ['name']
        },
        raw: true
    })
        .then(instances => res.json(instances))
        .catch(err => console.log(err));
});

router.get("/", (req,res) => {
    db.instances.findAll({
        include: {
            model: db.crops,
            attributes: ['name']
        },
        where: {
            userId: 1
        },
        raw: true
    })
        .then(instances => res.json(instances))
        .catch(err => console.log(err));
});

module.exports = router;