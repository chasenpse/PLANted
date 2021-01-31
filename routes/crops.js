const router = require('express').Router();
const Crop = require('../models/Crop');
const { Op } = require("sequelize");

router.get("/:id", (req,res) => {
    const crops = Crop.findAll({
        where: {
            userId: {
                [Op.eq]: req.params.id
            }
        }
    })
        .then(crops => res.send(crops))
        .catch(err => console.log(err));
});

module.exports = router;