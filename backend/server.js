const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
// https://stackoverflow.com/questions/58134287/catch-error-for-bad-json-format-thrown-by-express-json-middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        if (err.type === 'entity.parse.failed') {
            let data = req.body || req.query;
            try {
                JSON.parse(data); // <-- reproduce error in order to catch it
            } catch (error) {
                // get the first line of error which is "SyntaxError: Unexpected string in JSON at position 59"
                let message = error.toString().split("\n")[0];
                return res.status(400).send({ status: 400, message: message }); // Bad request
            }
        }
        else return res.status(400).send(err); // Bad request
    }
    next();
});
app.use(async (err, req, res, next) => {
    res.status(500).send({ error: err });
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const postsRouter = require('./api/routes/posts');
const usersRouter = require('./api/routes/users');
const authRouter = require('./api/routes/auth');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
