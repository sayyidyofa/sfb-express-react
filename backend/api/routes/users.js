const router = require('express').Router();
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

let User = require('../../models/user');

router.get("/me", isAuth, async (req, res) => {
    User.findById(req.user.id).populate("posts").exec((error, userWithPosts) => {
        if (error) res.status(404).json({
            message: "Not Found"
        }); else res.json(userWithPosts)
    });
});

// Admin user crud
router.route('/').get(isAuth, isAdmin, (req, res) => {
    User.find({_id: {$nin: [req.user.id]}}) // https://docs.mongodb.com/manual/reference/operator/query/nin/#op._S_nin
        .then(users => res.json(users))
        .catch(err => res.status(404).json({message: "Not Found"}));
});

router.route('/:id').get(isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id)
        .then(User => res.json(User))
        .catch(err => res.status(404).json({message: "Not Found"}));
});

router.route('/').post(isAuth, isAdmin, (req, res) => {
    const {0: name, 1: username, 2: password, 3: role} = [ req.body.name, req.body.username, req.body.password, 'user' ];

    const newUser = new User({name, username, password, role});

    newUser.save()
        .then((user) => res.json({id: user.id}))
        .catch(err => res.status(500).json({message: "Server Error"}));
});

router.route('/:id').put(isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id)
        .then(User => {
            User.username = req.body.username;
            User.name = req.body.name;
            User.role = req.body.role || 'user';
            if (req.body.password !== undefined && typeof req.body.password === 'string' && req.body.password.length > 0) User.password = req.body.password;

            User.save()
                .then(() => res.json({id: User.id}))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(404).json({message: "Not Found"}));
});

router.route('/:id').delete(isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id, (err, userDoc) => {
        if (err) res.status(404).json({message: "Not Found"});
        else {
            userDoc.remove(()=>{
                res.json('User deleted')
            });
        }
    });
    /*User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));*/
});

module.exports = router;
