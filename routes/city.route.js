const express = require('express');
const router = express.Router();
const cityModel = require('../model/city.model');
router.get('/city/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await cityModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        res.json(result);
    }
})
module.exports = router;