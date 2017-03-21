/**
 * Created by Administrator on 2017/3/21.
 */

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    }
};