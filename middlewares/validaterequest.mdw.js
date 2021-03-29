const query = require('../model/actor.model');
module.exports = async (req, res, next) => {
    const id = req.params.id;
    if (id || 0) {
        const result = await query.single(id);
        if (result == 0) {
            res.json({ message: "Id is not exist" })
        }
    }

    next();

}