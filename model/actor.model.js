const db = require('../util/db');
module.exports = {
    all() {
        return db('actor');
    },
    async single(id) {
        return await db('actor').where('actor_id', id);
    },
    add(actor) {
        return db('actor').insert(actor);
    },
    async update(id, update_actor) {
        return await db('actor').where('actor_id', id).update(update_actor);
    },
    async delete(id) {
        return await db('actor').where('actor_id', id).del();
    }

}