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
    /*req.body.content.replace(/[\u2028\u2029]/g, function (c) { return '\\u' + c.charCodeAt(0).toString(16); });*/
    const {0: author, 1: title, 2: content} = [ req.body.author, req.body.title, req.body.content ];
    let newPost = new Post({author, title, content});

    newPost.save()
        .then(() => res.json({id: newPost._id}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put(isAuth, (req, res) => {
    Post.findById(req.params.id)
        .then(Post => {
            Post.author = req.body.author || req.user.id;
            Post.title = req.body.title;
            Post.content = req.body.content;

            Post.save()
                .then(() => res.json({id: Post._id}))
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
