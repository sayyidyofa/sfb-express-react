import { Seeder } from 'mongoose-data-seed';
import User from '../models/user';

const data = [
    {
        name: 'User Biasa 1',
        username: 'user1',
        password: 'secret',
        role: 'user'
    },
    {
        name: 'User Biasa 2',
        username: 'user2',
        password: 'secret',
        role: 'user'
    },
    {
        name: 'User Biasa 3',
        username: 'user3',
        password: 'secret',
        role: 'user'
    },
    {
        name: 'User Biasa 4',
        username: 'user4',
        password: 'secret',
        role: 'user'
    },
    {
        name: 'User Admin 1',
        username: 'admin1',
        password: 'secret',
        role: 'admin'
    }
];

class UsersSeeder extends Seeder {
    async shouldRun() {
        return User.countDocuments()
            .exec()
            .then(count => count === 0);
    }

    async run() {
        /*for (const item of data) {
            let index = data.indexOf(item);
            const salt = await bcrypt.genSalt(10);
            item.password = await bcrypt.hash(item.password, salt);
        }*/
        return User.create(data);
    }

    async beforeRun() {
        await User.deleteMany({});
    }

    constructor() {
        super();
    }
}

export default UsersSeeder;
