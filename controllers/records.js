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
            var user = await userInfo.findAll({
                where: {
                    user_id: find_people.deliver
                }
            });
            const {pictures, title, type, who, place, describe, tel, wechat, qq} = ctx.request.body;
            find_goods.good_title = title;
            find_goods.find_place = place;
            find_goods.detail = describe;
            find_goods.typeof = type;
            find_goods.deliver_time = new Date();
            find_goods.p1 = pictures[0];
            find_goods.p2 = pictures[1];
            find_goods.p3 = pictures[2];
            find_goods.p4 = pictures[3];
            find_goods.p5 = pictures[4];
            find_goods.p6 = pictures[5];
            find_goods.p7 = pictures[6];
            find_goods.p8 = pictures[7];

            user.user_name = who;
            user.tel_num = tel;
            user.wechat_num = wechat;
            user.qq_num = qq;
            await find_people.save();
            await user.save();
        })();
        return {find_goods, user};
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
            const {pictures, title, type, who, place, describe, tel, wechat, qq} = ctx.request.body;
            find_people.good_title = title;
            find_people.find_place = place;
            find_people.detail = describe;
            find_people.typeof = type;
            find_people.deliver_time = new Date();
            find_people.p1 = pictures[0];
            find_people.p2 = pictures[1];
            find_people.p3 = pictures[2];
            find_people.p4 = pictures[3];
            find_people.p5 = pictures[4];
            find_people.p6 = pictures[5];
            find_people.p7 = pictures[6];
            find_people.p8 = pictures[7];

            user.user_name = who;
            user.tel_num = tel;
            user.wechat_num = wechat;
            user.qq_num = qq;
            await find_people.save();
            await user.save();
        })();
        return {find_people, user};
    }
};