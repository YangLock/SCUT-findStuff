const db = require('../db');

module.exports = db.defineModel('temporary',{
    good_id: {
        type: db.NUMERIC(12,0),
        primaryKey: true,
        references: {
            model: find_good,
            key: good_id
        },
        allowNull: false
    },
    wechat_num: db.VARCHAR(20),
    qq_num: db.NUMERIC(15,0),
    tel_num: db.NUMERIC(11,0)
});