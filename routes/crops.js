const router = require('express').Router();
const db = require('../config/db');

router.get("/:id/names", (req,res) => {
    db.crops.findAll({
        attributes: ['id', 'name'],
        where: {
            userId: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.get("/:id", (req,res) => {
    db.crops.findAll({
        where: {
            userId: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.get("/", (req,res) => {
    db.crops.findAll({
        where: {
            userId: 1
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.patch("/", async (req, res) => {
    res.send(req.body)
})

router.post("/", async (req, res) => {
    res.send(req.body)
})

router.delete("/", async (req, res) => {
    res.send(req.body)
})

module.exports = router;