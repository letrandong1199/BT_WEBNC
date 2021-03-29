const express = require('express');
const router = express.Router();
const actorModel = require('../model/actor.model');
router.get('/', async (req, res) => {
    const list = await actorModel.all();
    res.json(list);
})
router.get('/actor/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await actorModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        res.json(result);
    }
})

const schema = require('../schema/actor.json');
router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const actor = req.body;
    const ret = await actorModel.add(actor);
    console.log(ret);
    actor.actor_id = ret[0];
    res.status(201).json(actor);
})

router.put('/actor/:id', require('../middlewares/validate.mdw')(schema), async (req, res) => {
    const id = req.params.id;
    const update_actor = req.body;

    const ret = await actorModel.update(id, update_actor);
    console.log(ret);
    if (!ret) {
        res.json({ message: "Fail update......" })
    }
    res.json({ message: "Success" })
})

router.delete('/actor/:id', async (req, res) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await actorModel.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
            return
        }
        const ret = await actorModel.delete(id);
        console.log(ret);
        res.json({ message: "Successs ...." })
    }
})
module.exports = router;