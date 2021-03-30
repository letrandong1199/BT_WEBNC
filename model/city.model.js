const db = require('../util/db');
const TypeResponse = require('../util/enums/TypeResponse');
module.exports = {
    all() {
        return db('city');
    },
    single(id) {
        return db('city').where('city_id', id);
    },
    add(city) {
        return db('city').insert(city).catch(() => {
            return TypeResponse.FAIL.CREATE;
        });
    },
    update(id, update_city) {
        return db('city').where('city_id', id).update(update_city).catch(() => {
            return TypeResponse.FAIL.UPDATE;
        });
    },
    delete(id) {
        return db('city').where('city_id', id).del().catch(() => {
            return TypeResponse.FAIL.DELETE;
        });
    }

}