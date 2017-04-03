import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';

import { getSchema as getDefaultSchema } from 'lego-starter-kit/CoreApp/models/User';

export function getSchema(ctx) {
  const { Types } = ctx.db.Schema;
  const schema = new UniversalSchema({
    header: {
        type: String,
    },
    text: {
        type: String,
    },

    user: {
        type: Types.ObjectId,
        ref: 'User',
    },

  });

  return schema;
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('Post', schema.getMongooseSchema(), 'post');
};
