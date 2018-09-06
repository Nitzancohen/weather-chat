class Comment {
    constructor (text, post) {
        this.id = post.commentsCount;
        this.text = text;
    }
}

export default Comment;