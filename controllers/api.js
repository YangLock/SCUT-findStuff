/**
 *  api/be found
 *  api/reedit
 *  api/refresh
 *  api/delete
 *  api/edit info我的界面
 */
const APIError = require('../rest').APIError;
const model = require('../model');
const records = require('./records');

module.exports = {
    'DELETE /api/delete/findGood/:id': async(ctx, next) =>{
        console.log('delete record ${ctx.params.id}...');
        var record = records.deleteRecordFromGood(ctx.params.id);
        if(record){
            ctx.rest(record);
        }
        else{
            throw new APIError('record:not_found', 'record not found by id');
        }
    },
    'DELETE /api/delete/findPerson/:id': async(ctx, next) =>{
        console.log('delete record ${ctx.params.id}...');
        var record = records.deleteRecordFromPerson(ctx.params.id);
        if(record){
            ctx.rest(record);
        }
        else{
            throw new APIError('record:not_found', 'record not found by id');
        }
    }
};