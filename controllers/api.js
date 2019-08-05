const APIError = require('../rest').APIError;

module.exports = {
    'DELETE /api/delete/:id': async(ctx, next) =>{
        console.log('delete record ${ctx.params.id}...');
        
    }
};