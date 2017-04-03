import getController from './Post.controller';

export default (ctx, params) => {
  const api = ctx.asyncRouter();
  const resource = getController(ctx);

  api.all('/save', resource.save );

  return api;
};
