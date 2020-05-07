const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const transformer = require('../../helpers/transform');
let User = require('../../models/user');

router.post(
    "/register",
    [
        check("name", "Please Enter a Valid Name").not().isEmpty(),
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { username, password, name } = req.body;
        const role = "user";
        try {
            let user = await User.findOne({username});
            if (user)  {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                password,
                name,
                role
            });

            await user.save();

            const userDTO = transformer.toUserDto(user);

            res.status(200).json(userDTO);

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    [
        check("username", "Please enter a valid username").not().isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { username, password } = req.body;
        try {
            let user = await User.findOne({
                username
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const user_id = user.id;
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    // expiresIn: 360000000000000000000000000000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                        user_id
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;
