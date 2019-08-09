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
    }
};