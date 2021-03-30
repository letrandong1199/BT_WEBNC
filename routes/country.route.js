const express = require('express');
const router = express.Router();
const countryModel = require('../model/country.model');
const TypeResponse = require('../util/enums/TypeResponse');
router.get('/country/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await countryModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })
        }
        res.json(result);
    }
})

const schema = require('../schema/country.json');
router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const country = req.body;
    const ret = await countryModel.add(country);
    country.country_id = ret[0];
    if (ret === TypeResponse.FAIL.CREATE)
        return res.json(ret);
    res.status(201).json(country);
})

router.put('/country/:id', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const id = req.params.id;
    const update_country = req.body;
    if (id || 0) {
        const result = await countryModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })
        }
    }
    const ret = await countryModel.update(id, update_country);
    if (ret === TypeResponse.FAIL.UPDATE)
        return res.json(ret);
    res.status(200).json({ message: "Success" });
})

router.delete('/country/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await countryModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        const ret = await countryModel.delete(id);
        if (ret === TypeResponse.FAIL.DELETE)
            return res.json(ret);
        res.json({ message: "Successs ...." })
    }
})

module.exports = router;