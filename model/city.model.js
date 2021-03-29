const db = require('../util/db');
module.exports = {
    all() {
        return db('city');
    },
    single(id) {
        return db('city').where('city_id', id);
    },
    add(city) {
        return db('city').insert(city);
    },
    update(id, update_city) {
        return db('city').where('city_id', id).update(update_city);
    },
    delete(id) {
        return db('city').where('city_id', id).del();
    }

}