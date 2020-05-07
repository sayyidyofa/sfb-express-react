const router = require('express').Router();
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const transformer = require('../../helpers/transform');
let User = require('../../models/user');

router.get("/me", isAuth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        User.findById(req.user.id).populate("posts").exec((error, userWithPosts) => {
            res.json(transformer.toUserDto(userWithPosts, true))
        });
        /*const user = await User.findById(req.user.id).populate("posts").exec();
        const userDTO = transformer.toUserDto(user);
        res.json(userDTO);*/
    } catch (e) {
        console.log(e);
        res.send({message: "Error in Fetching user"});
    }
});

// Admin user crud
router.route('/').get(isAuth, isAdmin, (req, res) => {
    User.find({_id: {$nin: [req.user.id]}}) // https://docs.mongodb.com/manual/reference/operator/query/nin/#op._S_nin
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id)
        .then(User => res.json(User))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post(isAuth, isAdmin, (req, res) => {
    const {0: name, 1: username, 2: password, 3: role} = [ req.body.name, req.body.username, req.body.password, 'user' ];

    const newUser = new User({name, username, password, role});

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post(isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id)
        .then(User => {
            User.username = req.body.username;
            User.name = req.body.name;
            User.role = req.body.role || 'user';

            User.save()
                .then(() => res.json('User updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(isAuth, isAdmin, (req, res) => {
    User.findById(req.params.id, (err, userDoc) => {
        if (err) res.status(400).json('Error: ' + err);
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
