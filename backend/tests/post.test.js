let mongoose = require("mongoose");

let Post = require("../models/post");

let server = require('../server');
let { should } = require('chai');
let request = require('supertest');
let { testingCreds } = require('../config');


describe('Post', () => {
    describe('GET /posts', () => {
        it('it should GET all the posts', (done) => {
            request(server)
                .get('/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.greaterThan(0);
                    done();
                });
        });
    });
});
