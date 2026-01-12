import { Context, Next } from 'koa';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import Router from '@koa/router';

const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yml'));


export const swaggerDocsRouter = new Router();
swaggerDocsRouter.get('/v1/docs', koaSwagger({
  routePrefix: false,
  swaggerOptions: {
    spec: swaggerDocument,
  },
}))