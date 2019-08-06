const db = require('../db');

module.exports = db.defineModel('find_good',{
    good_id: {
        type: db.BIGINT(12),
        primaryKey: true,
        allowNull: false
    },
    good_title: db.STRING(70),
    lost_place: db.STRING(50),
    detail: db.STRING(120),
    typeof: db.STRING(16),
    diliver_time: db.DATE(),
    deliver: {
        type: db.BIGINT(12),
        references: {
            model: userInfo,
            key: user_id
        }
    },
    stateof: db.STRING(10),
});