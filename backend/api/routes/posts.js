const router = require('express').Router();
const isAuth = require("../middleware/isAuth");
let Post = require('../../models/post');
const transformer = require('../../helpers/transform');

router.route('/').get((req, res) => {
    Post.find({}).then(posts=>res.json(posts)).catch(err=>{res.status(404).json({
        message: "Not Found"
    });});
});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id).populate('author', 'name').exec(
        (error, postWithAuthor) => {
            if (error) res.status(404).json({
                message: "Not Found"
            });
            else res.json(transformer.toPostDto(postWithAuthor))
        });
    //.then(post=>res.json(post)).catch(err=>{throw err});
});

router.route('/').post(isAuth, (req, res) => {
    /*req.body.content.replace(/[\u2028\u2029]/g, function (c) { return '\\u' + c.charCodeAt(0).toString(16); });*/
    const {0: author, 1: title, 2: content} = [ req.body.author || req.user.id, req.body.title, req.body.content ];
    let newPost = new Post({author, title, content});

    newPost.save()
        .then(() => res.json({id: newPost._id}))
        .catch(err => res.status(500).json({message: 'Server Error'}));
});

router.route('/:id').put(isAuth, (req, res) => {
    Post.findById(req.params.id)
        .then(Post => {
            Post.author = req.body.author || req.user.id;
            Post.title = req.body.title;
            Post.content = req.body.content;

            Post.save()
                .then(() => res.json({id: Post._id}))
                .catch(err => res.status(500).json({message: 'Server Error'}));
        })
        .catch(err => res.status(404).json({message: 'Not Found'}));
});

router.route('/:id').delete(isAuth, (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(404).json({message: 'Not Found'}));
});

module.exports = router;
