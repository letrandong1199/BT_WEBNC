const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category.model');
router.get('/', async (req, res) => {
    const list = await categoryModel.all();
    res.json(list);
})
router.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await categoryModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        res.json(result);
    }
})

const schema = require('../schema/category.json');
router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const category = req.body;
    console.log(category);
    const ret = await categoryModel.add(category);
    console.log(ret);
    category.category_id = ret[0];
    res.status(201).json(category);
})

router.put('/category/:id', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const id = req.params.id;
    const update_category = req.body;

    const ret = await categoryModel.update(id, update_category);
    console.log(ret);
    if (!ret) {
        res.json({ message: "fail update......" })
    }
    res.json({ message: "Success" })
})

router.delete('/category/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await categoryModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        const ret = await categoryModel.delete(id);
        console.log(ret);
        res.json({ message: "Successs ...." })
    }
})

module.exports = router;