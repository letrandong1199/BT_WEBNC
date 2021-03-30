const db = require('../util/db');
const TypeResponse = require('../util/enums/TypeResponse');
module.exports = {
    all() {
        return db('category');
    },
    single(id) {
        return db('category').where('category_id', id);
    },
    add(category) {
        return db('category').insert(category).catch(() => {
            return TypeResponse.FAIL.CREATE;
        });
    },
    update(id, update_category) {
        return db('category').where('category_id', id).update(update_category).catch(() => {
            return TypeResponse.FAIL.UPDATE;
        });
    },
    delete(id) {
        return db('category').where('category_id', id).del().catch(() => {
            return TypeResponse.FAIL.DELETE;
        });
    }

}