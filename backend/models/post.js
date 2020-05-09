const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        unique: false,
        required: 'Post author cannot be blank',
    },

    title: {
        type: String,
        trim: true,
        required: 'Post title cannot be blank',
    },

    content: {
        type: String,
        trim: true,
        required: 'Post content cannot be blank',
    }
}, {
    timestamps: true
});

/*postSchema.post('save', (postDoc) => {
    User.findByIdAndUpdate(
        postDoc.author,
        {$push: {posts: postDoc.id}},
        {safe:true, upsert: true},
        function(err, model) {
            var x=err;
            console.log(err.message);
            throw err;
        }
    );
});*/

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
