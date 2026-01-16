
import Koa, { Context } from 'koa';
import json from 'koa-json';
import Router from '@koa/router';
import { mainRouter } from './routes/router';
import { bodyParser } from '@koa/bodyparser';
import passport from './config/authConfig';
import koaPinoLogger from 'koa-pino-logger';
import logger from './config/logger';
import { swaggerDocsRouter } from './config/swagger';

const router = new Router();

router.get('/', (ctx: Context) => ctx.redirect('/v1/docs'))
router.get('/ping', (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
        status: ctx.status,
        message: 'success'
    }
})

const app = new Koa();
app.use(koaPinoLogger({logger}));
app.use(json());
app.use(bodyParser());
app.use(passport.initialize());
app.use(router.routes());
app.use(swaggerDocsRouter.routes());
app.use(mainRouter.routes()).use(mainRouter.allowedMethods());

export default app;


