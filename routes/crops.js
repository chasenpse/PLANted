const router = require('express').Router();
const db = require('../config/db');

router.get("/:id/names", (req,res) => {
    db.crops.findAll({
        attributes: ['id', 'name'],
        where: {
            userId: req.params.id
        },
        order: [
            ['name', 'ASC']
        ],
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.get("/:id", (req,res) => {
    db.crops.findAll({
        attributes: ['id','name','growTime','sproutTime','notes','createdAt','updatedAt'],
        where: {
            userId: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.get("/", (req,res) => {
    db.crops.findAll({
        attributes: ['id','name','growTime','sproutTime','notes','createdAt','updatedAt'],
        where: {
            userId: 1
        },
        order: [
            ['updatedAt', 'DESC']
        ],
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.put("/", async (req, res) => {
    res.send(req.body)
})

router.post("/", async (req, res) => {
    res.status(200).send(req)
})

router.delete("/", async (req, res) => {
    res.send(req.body)
})

module.exports = router;