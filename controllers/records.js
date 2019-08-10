const model = require('../model');
let findGood = model.findGood;
let findPerson = model.findPerson;
module.exports = {
    deleteRecordFromGood: (id)=>{
        (async ()=>{
            var find_goods = await findGood.findAll({
                where: {
                    good_id: id
                }
            });
            await find_goods.destroy();
        })();
        return null;
    },
    deleteRecordFromPerson: (id)=>{
        (async ()=>{
            var find_people = await findPerson.findAll({
                where: {
                    good_id: id
                }
            });
            await find_people.destroy();
        })();   
        return null;
    },
    confirmRecordFromGood: (id)=>{
        (async ()=>{
            var find_goods = await findGood.findAll({
                where: {
                    good_id: id
                }
            });
            find_goods.stateof = '已找回';
            await find_goods.save();
        })();
        return find_goods;
    },
    confirmRecordFromPerson: (id)=>{
        (async ()=>{
            var find_people = await findPerson.findAll({
                where: {
                    good_id: id
                }
            });
            find_people.stateof = '已认领';
            await find_people.save();
        })();
        return find_people;
    },
    reedit: (id)=>{
        (async ()=>{
            
        })();
    }
};