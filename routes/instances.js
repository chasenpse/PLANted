const router = require('express').Router();
const db = require('../config/db');

router.get("/:id", (req,res) => {
    db.instances.findOne({
        attributes: ['id','cropId','quantity','stages','startDate','endDate','notes','createdAt','updatedAt','crop.name'],
        include: {
            model: db.crops,
            attributes: ['name']
        },
        where: {
            id: req.params.id
        },
        raw: true
    })
        .then(instances => res.json([instances]))
        .catch(err => console.log(err));
});

router.get("/", (req,res) => {
    console.log(req.query)
    db.instances.findAll({
        attributes: [
            'id',
            'cropId',
            'quantity',
            'stages',
            'startDate',
            'endDate',
            'notes',
            'createdAt',
            'updatedAt'
        ],
        include: {
            model: db.crops,
            attributes: [
                'name',
                'growTime',
                'sproutTime',
            ]
        },
        where: {
            userId: 1
        },
        order: [
            ['updatedAt', 'DESC']
        ],
        raw: true
    })
        .then(instances => res.json(instances))
        .catch(err => console.log(err));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const instance = await db.instances.findOne({
            include: {
                model: db.crops,
                attributes: ['name']
            },
            where: {id},
        })
        const {cropId, quantity, stages, startDate, endDate, notes} = req.body;
        instance.cropId = cropId || instance.cropId;
        instance.quantity = quantity || instance.quantity;
        instance.stages = stages || instance.stages;
        instance.startDate = startDate || instance.startDate;
        instance.endDate = endDate || instance.endDate;
        instance.notes = notes;
        instance.save();
        res.status(200).send(instance)
    } catch (e) {
        console.log(e);
    }
})

router.post("/", async (req, res) => {
    const {cropId, quantity, stages, startDate, endDate, notes} = req.body;
    try {
        const instance = await db.instances.create({userId:1, cropId, quantity, stages, startDate, endDate, notes})
        res.status(200).send(instance)
    } catch(err) {
        console.log(err)
        res.status(500).send("something broke")
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const instance = await db.instances.findOne({ where: {id} })
        instance.destroy()
        res.status(200).send({success: true})
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;