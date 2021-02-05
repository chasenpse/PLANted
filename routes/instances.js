const router = require('express').Router();
const Instance = require('../models/Instance');
const Crop = require('../models/Crop');

router.get("/:id", (req,res) => {

    const instances = Instance.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Crop,
        }]
    })
        .then(instances => res.json(instances))
        .catch(err => console.log(err));
});

router.get("/", (req,res) => {

    const instances = Instance.findAll({
        where: {
            userId: 1
        },
        include: [{
            model: Crop,
        }]
    })
        .then(instances => res.json(instances))
        .catch(err => console.log(err));
});

module.exports = router;