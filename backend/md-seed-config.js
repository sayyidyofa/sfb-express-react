require("@babel/register")({});
import mongoose from 'mongoose';
import Users from './seeders/usersSeeder';
import Posts from './seeders/postsSeeder';
import {ATLAS_URI} from "./config";

const mongoURL = ATLAS_URI || process.env.ATLAS_URI || 'mongodb://localhost:27017/sfb-express';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
    Users,
    Posts
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
