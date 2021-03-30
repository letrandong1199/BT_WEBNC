const express = require('express');
const router = express.Router();
const cityModel = require('../model/city.model');
const TypeResponse = require('../util/enums/TypeResponse');
router.get('/city/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await cityModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })

        }
        res.json(result);
    }
})


const schema = require('../schema/city.json');
router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const city = req.body;
    const ret = await cityModel.add(city);
    if (ret === TypeResponse.FAIL.CREATE)
        return res.json(ret);
    city.city_id = ret[0];
    res.status(201).json(city);
})

router.put('/city/:id', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const id = req.params.id;
    const update_city = req.body;
    if (id || 0) {
        const result = await cityModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
    }
    const ret = await cityModel.update(id, update_city);
    if (ret === TypeResponse.FAIL.UPDATE)
        return res.json(ret);
    res.status(200).json({ message: "Success" });
})

router.delete('/city/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await cityModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        const ret = await cityModel.delete(id);
        if (ret === TypeResponse.FAIL.DELETE)
            return res.json(ret);
        res.json({ message: "Successs ...." })
    }
})

module.exports = router;