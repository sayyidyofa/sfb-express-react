let mongoose = require("mongoose");

let User = require("../models/user");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let request = require('supertest')(server);
let should = chai.should();
let { testingCreds } = require('../config');


chai.use(chaiHttp);
//Our parent block
describe('Users', function() {
    this.timeout(5000);
    /*beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });*/

    it('should require authorization', function(done) {
        request
            .get('/users')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    var auth = {};
    before(loginUser(auth));

    it('should require admin privileges', function(done) {
        request
            .get('/users')
            .set('token', auth.token)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    before(loginAdmin(auth));

    describe('GET /users', () => {
        it('it should GET all the users', (done) => {
            request()
                .get('/users')
                .set('token', auth.token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });
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
