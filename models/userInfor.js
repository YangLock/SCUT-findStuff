const db = require('../db');

module.exports = db.defineModel('userInfo',{
    user_id: {
        primaryKey: true,
        type: db.NUMERIC(12,0),
        allowNull: false
    },
    user_name: db.VARCHAR(20),
    wechat_num: db.VARCHAR(20),
    qq_num: db.NUMERIC(15,0),
    tel_num: db.NUMERIC(11,0)
});