const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema =
    new Schema({
        name : {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        password: {
            type: String,
            required: true
        },
        role : {
            type: String,
            required: true,
        }/*,
        posts: [
            {
                type: Schema.Types.ObjectId,
                required: false,
                ref: 'Post'
            }
        ]*/
    }, {
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform(doc, ret) {

                delete ret.role;
                delete ret.password;
                delete ret._id;
            }
        }
    });

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    justOne: false
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // https://stackoverflow.com/questions/11325372/mongoose-odm-change-variables-before-saving
})

userSchema.pre('remove', function() {
    this.model('Post').remove({ author: this._id });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
