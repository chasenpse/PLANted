const router = require('express').Router();
const Crop = require('../models/Crop');

router.get("/:id", (req,res) => {
    const crops = Crop.findAll({
        where: {
            id: req.params.id
        },
    })
        .then(crops => res.json(crops))
        .catch(err => console.log(err));
});

module.exports = router;