const db = require('../util/db');
module.exports = {
    all() {
        return db('country');
    },
    single(id) {
        return db('country').where('country_id', id);
    },
    add(country) {
        return db('country').insert(country);
    },
    update(id, update_country) {
        return db('country').where('country_id', id).update(update_country);
    },
    delete(id) {
        return db('country').where('country_id', id).del();
    }

}