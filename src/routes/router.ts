import Router from '@koa/router';
import {authRouter} from './auth/authRouter';
import { booksRouter } from './books/booksRouter';
import { userRouter } from './users/usersRouter';
import { Context } from 'koa';

// Main router;
const router = new Router({
    'prefix': '/v1'
});

router.get('/ping', (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
        status: ctx.status,
        message: 'success'
    }
})

router.use(authRouter.routes()).use(authRouter.allowedMethods());
router.use(booksRouter.routes()).use(booksRouter.allowedMethods());
router.use(userRouter.routes()).use(userRouter.allowedMethods());

export default router