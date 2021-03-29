const express = require('express');
const router = express.Router();
const countryModel = require('../model/country.model');
router.get('/country/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await countryModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        res.json(result);
    }
})
module.exports = router;