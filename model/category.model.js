const db = require('../util/db');
module.exports = {
    all() {
        return db('category');
    },
    single(id) {
        return db('category').where('category_id', id);
    },
    add(category) {
        return db('category').insert(category);
    },
    update(id, update_category) {
        return db('category').where('category_id', id).update(update_category);
    },
    delete(id) {
        return db('category').where('category_id', id).del();
    }

}