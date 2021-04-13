const router = require('express').Router();
const db = require('../config/db');

router.get("/names", (req,res) => {
    db.crops.findAll({
        attributes: ['id', 'name'],
        where: {
            userId: req.user.id
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
            id: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.get("/", (req,res) => {
    db.crops.findAll({
        attributes: ['id','name','growTime','sproutTime','notes','createdAt','updatedAt'],
        where: {
            userId: req.user.id
        },
        order: [
            ['updatedAt', 'DESC']
        ],
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const crop = await db.crops.findOne({
            where: {id},
        })
        const {name, growTime, sproutTime, notes} = req.body;
        crop.name = name || crop.name;
        crop.growTime = growTime || crop.growTime;
        crop.sproutTime = sproutTime || crop.sproutTime;
        crop.notes = notes;
        crop.save();
        res.status(200).send(crop)
    } catch (e) {
        console.log(e);
    }
})

router.post("/", async (req, res) => {
    const {name, growTime, sproutTime, notes} = req.body;
    try {
        const crop = await db.crops.create({userId:req.user.id, name, growTime, sproutTime, notes})
        res.status(200).send(crop)
    } catch(err) {
        console.log(err)
        res.status(500).send("something broke")
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const crop = await db.crops.findOne({ where: {id, userId: req.user.id} })
        crop.destroy()
        res.status(200).json(true)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;