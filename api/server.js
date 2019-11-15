const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const session = require('express-session'); //1. add this 
const KnexSessionStorage = require('connect-session-knex')(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const knexConnection = require('../database/dbConfig.js');

const server = express();

const sessionConfiguration = {
    name: 'Cheesy',
    secret: process.env.COOKIE_SECRET || 'I lobster, but then I flounder.',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: process.env.NODE_ENV === 'development' ? false:true,
        httpOnly: true,
    },
    resave: false,
    saveUnitialized: true,
    store: new KnexSessionStorage({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 20,
        tablename: 'user_sessions',
        sidfieldname: 'id',
        creatable: 'true',
    })
};


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfiguration));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
