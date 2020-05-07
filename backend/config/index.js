require('dotenv').config();
const config = {
    ATLAS_URI: process.env.ATLAS_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    testingCreds: {
        user: {
            username: "user1",
            password: "secret"
        },
        admin: {
            username: "admin",
            password: "secret"
        }
    }
};

module.exports = config;

/*import dotenv from 'dotenv';
dotenv.config();

export default class Config {
    static ATLAS_URL = process.env.ATLAS_URI;
    static JWT_SECRET = process.env.JWT_SECRET;

    // Seed Data
    static userSeeds = {

    };
    static postSeeds = {

    };
}*/
