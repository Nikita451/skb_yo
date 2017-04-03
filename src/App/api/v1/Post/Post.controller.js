import Modules from '../v1.modules';

export default (ctx) => {
    const {Post} = ctx.models;
    const modules = new Modules(ctx)
    const {e404, e500} =  ctx.errors
    const controller = {}

    controller.save = async (req) => {
        
        //modules.isAuth(req);
        //const userId = req.user._id;
        const params = req.allParams();
        console.log('PARAMS save')
        console.log(params)
        const {header, text, user} = params
        const newPost = new Post({
            header,
            text,
            user
        })

        return newPost.save()
    }

    return controller;
};

