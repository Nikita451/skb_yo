import PostPage from './PostPage.jsx'

export default {
    action: async ({ page, appStore, ctx, app }, { id }) => {
        let post = null
        if (__SERVER__) {
              post = await app.models.Post.findById( id ).populate('user')
        } else {
            post = appStore.posts.getById(id)
        }
        
        return page
            .pushTitle("Пост")
            .component( PostPage, { post: post } )
        
    }
}
