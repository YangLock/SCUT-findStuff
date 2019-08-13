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
        records.deleteRecordFromGood(ctx.params.id);
    },
    'DELETE /api/delete/findPerson/:id': async(ctx, next) =>{
        console.log('delete record ${ctx.params.id}...');
        records.deleteRecordFromPerson(ctx.params.id);
    },
    'PUT /api/foundConfirm/:id': async(ctx, next) =>{
        console.log('confirm record ${ctx.params.id}...');
        var record = records.confirmRecordFromGood(ctx.params.id);
        if(record){
            ctx.rest(record);
        }
        else{
            throw new APIError('record:not_found', 'record not found by id');
        }
    },
    'PUT /api/claimConfirm/:id': async(ctx, next) =>{
        console.log('confirm record ${ctx.params.id}...');
        var record = records.confirmRecordFromPerson(ctx.params.id);
        if(record){
            ctx.rest(record);
        }
        else{
            throw new APIError('record:not_found', 'record not found by id');
        }
    },
    'PUT /api/reEdit/findGood/:id': async(ctx, next) =>{
        console.log('reedit record ${ctx.params.id}...');
        var record = records.reeditRecordFromGood(ctx.params.id);
        if(record[0]&&record[1]){
            ctx.rest(record);
        }
        else{
            throw new APIError('record:not_found', 'record not found by id');
        }
    },
    'PUT /api/reEdit/findPerson/:id': async(ctx, next) =>{
        console.log('reedit record ${ctx.params.id}...');
        var record = records.reeditRecordFromPerson(ctx.params.id);
        if(record[0]&&record[1]){
            ctx.rest(record);
        }
        else{
            throw new APIError('record:not_found', 'record not found by id');
        }
    },
};