const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category.model');
const TypeResponse = require('../util/enums/TypeResponse');
router.get('/', async (req, res) => {
    const list = await categoryModel.all();
    res.json(list);
})
router.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await categoryModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })
        }
        res.json(result);
    }
})

const schema = require('../schema/category.json');
router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const category = req.body;
    const ret = await categoryModel.add(category);
    category.category_id = ret[0];
    if (ret === TypeResponse.FAIL.CREATE)
        return res.json(ret);
    res.status(201).json(category);
})

router.put('/category/:id', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const id = req.params.id;
    const update_category = req.body;
    if (id || 0) {
        const result = await categoryModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })
        }
    }
    const ret = await categoryModel.update(id, update_category);
    if (ret === TypeResponse.FAIL.UPDATE)
        return res.json(ret);
    res.json({ message: "Success" })
})

router.delete('/category/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await categoryModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" });
        }
        const ret = await categoryModel.delete(id);
        if (ret === TypeResponse.FAIL.DELETE)
            return res.json(ret);
        res.json({ message: "Successs ...." })
    }
})

module.exports = router;