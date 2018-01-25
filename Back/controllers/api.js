const products = require('../products');

const User = require('../modules/User');

const {throwApiErr} = require('../middlewares/forREST');


module.exports = {
    'GET /api/products': async (ctx, next) => {
        throw new APIError('product:not_found', 'product not found by id.');
        ctx.rest({
            products: products.getProducts()
        });
    },

    'GET /api/user/:id': async (ctx, next) => {
        const user = new User(ctx.params.id);
        const projects = await user.getProjects();
        if(projects){
            ctx.rest({
                products: await user.getProjects(),
            });
        }
        else{
            throwApiErr(ctx, 'user_not_found');
        }
    },

    'POST /api/products': async (ctx, next) => {
        var p = products.createProduct(
                            ctx.request.body.name,
                            ctx.request.body.manufacturer,
                            Number.parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        }
        else {
            throwApiErr(ctx, 'user_not_found');
        }
    }
};
