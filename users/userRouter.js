const express = require('express');
const db = require('./userDb')
const users = require('../data/dbConfig')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
db.insert(req.body)
.then(user => {
    res.send(user)
})
.catch(() => {
    res.send('error')
})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
db.insert(req.body)
.then(post => {
    res.send(post)
})
.catch(() => {
    res.send('error')
})
});

router.get('/', (req, res) => {
db.get()
.then(array => {
    res.send(array)
})
.catch(() => {
    res.send('Error')
})
});

router.get('/:id', validateUserId, (req, res) => {
db.getById(req.params.id)
.then(obj => {
    res.send(obj)
})
.catch(() => {
    res.send('error')
})
});

router.get('/:id/posts', validateUserId, (req, res) => {
db.getUserPosts(req.params.id)
.then(post => {
    res.send(post)
})
.catch(() => {
    res.send('error')
})
});

router.delete('/:id', validateUserId, (req, res) => {
db.remove(req.params.id)
.then(post => {
    res.send(post)
})
.catch(() => {
    res.send('error')
})
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
db.update(req.params.id, req.body)
.then(post => {
    res.send(post)
})
.catch(() => {
    res.send('error')
})
});

//custom middleware

function validateUserId(req, res, next) {
db.getById(req.params.id)
.then(user => {
    if(user.id == req.params.id){
        next();
    }else{
        req.status(400).json({message: 'Invalid user ID'})
    }
})
.catch(() => {
    res.send('error')
})

};

function validateUser(req, res, next) {
if(!req.body || !req.body.name){
    res.send('error')
}else{
    next();
}
};

function validatePost(req, res, next) {
    if(!req.body || !req.body.text){
        res.send('error')
    }else{
        next();
    }
};

module.exports = router;
