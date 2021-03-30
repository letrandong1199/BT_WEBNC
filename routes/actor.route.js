const express = require('express');
const router = express.Router();
const actorModel = require('../model/actor.model');
const TypeResponse = require('../util/enums/TypeResponse');
router.get('/', async (req, res) => {
    const list = await actorModel.all();
    res.json(list);
})
router.get('/actor/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await actorModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })

        }
        res.json(result);
    }
})

const schema = require('../schema/actor.json');
router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const actor = req.body;
    const ret = await actorModel.add(actor);
    if (ret === TypeResponse.FAIL.CREATE)
        return res.json(ret);
    actor.actor_id = ret[0];
    res.status(201).json(actor);
})

router.put('/actor/:id', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const id = req.params.id;
    const update_actor = req.body;
    if (id || 0) {
        const result = await actorModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })

        }
    }
    const ret = await actorModel.update(id, update_actor);
    console.log(ret);
    if (ret === TypeResponse.FAIL.UPDATE)
        return res.json(ret);
    res.json({ message: "Success" })
})

router.delete('/actor/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await actorModel.single(id);
        if (result == 0) {
            return res.json({ message: "Id is not exist" })

        }
        const ret = await actorModel.delete(id);
        if (ret === TypeResponse.FAIL.DELETE)
            return res.json(ret);
        res.json({ message: "Successs ...." })
    }
})
module.exports = router;