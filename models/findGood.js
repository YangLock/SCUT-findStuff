const db = require('../db');

module.exports = db.defineModel('find_good',{
    good_id: {
        type: db.NUMERIC(12,0),
        primaryKey: true,
        allowNull: false
    },
    good_title: db.VARCHAR(70),
    lost_place: db.VARCHAR(50),
    detail: db.VARCHAR(120),
    typeof: db.VARCHAR(16),
    diliver_time: db.DATE,
    deliver: {
        type: db.NUMERIC(12,0),
        references: {
            model: userInfo,
            key: user_id
        }
    },
    stateof: db.VARCHAR(10),
});