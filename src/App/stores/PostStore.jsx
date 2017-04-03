import {observable, computed, action} from 'mobx'

export class Post {
    @observable header;
    @observable text;
    @observable user;
    @observable _id;
    constructor(header, text, user) {
        this.header = header
        this.text = text
        this.user = user
        this._id = undefined
    }

    @action
    set(header, text) {
        this.header = header
        this.text = text
    }

    toObject() {
        return {
            header: this.header,
            text: this.text,
            user: this.user,
        }
    }
}

export default class Posts {
    @observable posts = []
    Post = Post
    constructor(store, posts = []) {
        this.store = store
        this.posts = posts
    }

    @action
    add(todo) {
        this.posts.push( todo )
        this.store.api.addPost(todo.toObject())
    }

    @action
    update(id, newPost) {
        const {header, } = newPost
        for (let i=0; i < this.posts.length; i++) {
            let post = this.posts[i]
            if (post.id == id) {
                post.set( header, text )
                return;
            }
        }
    }

    getByUser(id_user) {
        return this.posts.filter( p => p.id_user == id_user )
    }

}