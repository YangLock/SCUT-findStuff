const db = require('../db');

module.exports = db.defineModel('find_person',{
    good_id: {
        type: db.BIGINT(12),
        allowNull: false,
        primaryKey: true
    },
    good_title: db.STRING(70),
    find_place: db.STRING(50),
    detail: db.STRING(120),
    typeof: db.STRING(16),
    diliver_time: db.DATE,
    deliver: {
        type: db.BIGINT(12),
        references: {
            model: userInfo,
            key: user_id
        }
    },
    stateof: db.STRING(10),
});