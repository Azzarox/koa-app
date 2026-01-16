import Router from '@koa/router';
import {authRouter} from './auth/authRouter';
import { booksRouter } from './books/booksRouter';
import { userRouter } from './users/usersRouter';

// Main router;
export const mainRouter = new Router({
    'prefix': '/v1'
});

mainRouter.use(authRouter.routes()).use(authRouter.allowedMethods());
mainRouter.use(booksRouter.routes()).use(booksRouter.allowedMethods());
mainRouter.use(userRouter.routes()).use(userRouter.allowedMethods());
