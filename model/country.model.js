const db = require('../util/db');
const TypeResponse = require('../util/enums/TypeResponse');
module.exports = {
    all() {
        return db('country');
    },
    single(id) {
        return db('country').where('country_id', id).catch(() => {
            return TypeResponse.FAIL.READ;
        });
    },
    add(country) {
        return db('country').insert(country).catch(() => {
            return TypeResponse.FAIL.CREATE;
        });
    },
    update(id, update_country) {
        return db('country').where('country_id', id).update(update_country).catch(() => {
            return TypeResponse.FAIL.UPDATE;
        });
    },
    delete(id) {
        return db('country').where('country_id', id).del().catch(() => {
            return TypeResponse.FAIL.DELETE;
        });
    }

}