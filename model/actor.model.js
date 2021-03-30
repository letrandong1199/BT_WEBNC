const db = require('../util/db');
const TypeResponse = require('../util/enums/TypeResponse');
module.exports = {
    all() {
        return db('actor');
    },
    async single(id) {
        return await db('actor').where('actor_id', id);
    },
    add(actor) {
        return db('actor').insert(actor).catch(() => {
            return TypeResponse.FAIL.CREATE;
        });
    },
    async update(id, update_actor) {
        return await db('actor').where('actor_id', id).update(update_actor).catch(() => {
            return TypeResponse.FAIL.UPDATE;
        });
    },
    async delete(id) {
        return await db('actor').where('actor_id', id).del().catch(() => {
            return TypeResponse.FAIL.DELETE;
        });
    }

}