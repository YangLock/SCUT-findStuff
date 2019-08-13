const model = require('../model');
let findGood = model.findGood;
let findPerson = model.findPerson;
let userInfo = model.userInfo;
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
    },
    confirmRecordFromGood: (id)=>{
        (async ()=>{
            var find_goods = await findGood.findAll({
                where: {
                    good_id: id
                }
            });
            find_goods.stateof = 'found';
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
            find_people.stateof = 'claimed';
            await find_people.save();
        })();
        return find_people;
    },
    reeditRecordFromGood: (id)=>{
        (async ()=>{
            var find_goods = await findGood.findAll({
                where: {
                    good_id: id
                }
            });
        })();
    },
    reeditRecordFromPerson: (id)=>{
        (async ()=>{
            var find_people = await findPerson.findAll({
                where: {
                    good_id: id
                }
            });
            var user = await userInfo.findAll({
                where: {
                    user_id: find_people.deliver
                }
            });
            find_people.good_title = '';
            find_people.find_place = '';
            find_people.detail = '';
            find_people.deliver_time = new Date();
            user.user_name = '';
            user.wechat_num = '';
            user.qq_num = '';
            user.tel_num = '';
            await find_people.save();
            await user.save();
        })();
    }
};