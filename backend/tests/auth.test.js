let mongoose = require("mongoose");

let User = require("../models/user");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let request = require('supertest')(app);
let { testingCreds } = require('../config');


describe('POST /auth/register', () => {
    it('should respond with JSON array', function (done) {
        request
            .post('/auth/register')
            .send({
                name: 'Dumb Name Here',
                username: 'dummyusername',
                password: 'dummypassword'
            })
            .expect(200)
            .end()
    });
});

function loginUser(auth) {
    return function(done) {
        request
            .post('/auth/login')
            .send(
                testingCreds.user
            )
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

function loginAdmin(auth) {
    return function(done) {
        request
            .post('/auth/login')
            .send(
                testingCreds.admin
            )
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}
