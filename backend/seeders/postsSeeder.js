import {Seeder} from 'mongoose-data-seed';
import faker from 'faker/locale/en_US';
import User from '../models/user';
import Post from '../models/post';

class UsersSeeder extends Seeder {
    async shouldRun() {
        return Post.countDocuments()
            .exec()
            .then(count => count === 0);
    }

    async run() {
        return Post.create(this.postsData);
    }

    async beforeRun() {
        this.users = await User.find({}).exec();
        this.postsData = this._generatePosts();
        await Post.deleteMany({});
    }

    _generatePosts() {
        return Array.apply(null, Array(20)).map(() => {
            const randomUser = faker.random.arrayElement(this.users);

            return {
                author: randomUser._id,
                title: faker.lorem.words(),
                content: faker.lorem.paragraphs()
            };
        });
    }

    constructor() {
        super();
    }
}

export default UsersSeeder;
