const express = require('express');
const userRoute = require('./users/userRouter')
const postRoute = require('./posts/postRouter')
const server = express();

server.use(express.json());
server.use(logger)
server.use('/users', userRoute)
server.use('/posts', postRoute)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`)

next();
};

module.exports = server;
