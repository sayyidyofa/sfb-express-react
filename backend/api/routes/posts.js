const router = require('express').Router();
const isAuth = require("../middleware/isAuth");
let Post = require('../../models/post');

router.route('/').get((req, res) => {
    Post.find({}).then(posts=>res.json(posts)).catch(err=>{throw err});
});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id).then(post=>res.json(post)).catch(err=>{throw err});
});

router.route('/').post(isAuth, (req, res) => {
    const {0: author, 1: title, 3: content} = [ req.body.author, req.body.title, req.body.content ];

    const newPost = new Post({author, title, content});

    newPost.save()
        .then(() => res.json('Post added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post(isAuth, (req, res) => {
    Post.findById(req.params.id)
        .then(Post => {
            Post.author = req.body.author;
            Post.title = req.body.title;
            Post.content = req.body.content;

            Post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(isAuth, (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
