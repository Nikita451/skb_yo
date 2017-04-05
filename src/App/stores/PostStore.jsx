import {observable, computed, action} from 'mobx'
import { set, clone } from 'lodash';

export class Post {
    @observable header;
    @observable text;
    @observable user;
    @observable _id;
    @observable updatedAt;
    constructor(header, text, user) {
        this.header = header
        this.text = text
        this.user = user
    }

    @action
    set(header, text) {
        this.header = header
        this.text = text
    }

    @action
    update(post) {
        // this.store.log.info('incoming user', user);
        //if (!user) return this.reset();
        if (!post) return
        for (const item in post) {
            set(this, item, post[item]);
        }
        return true;
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
    async add(todo) {
        let data = await this.store.api.addPost(todo.toObject())
        todo.update(data)
        this.posts.push( todo )
    }
    
    getByUser(id_user) {
        return this.posts.filter( p => p.user && p.user._id == id_user || p.user == id_user )
    }

    getById(id) {
        for (let i=0; i < this.posts.length; i++) {
            if (this.posts[i]._id == id) {
                return this.posts[i]
            }
        }
        return null
    }

}