const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(posts => {
        res.send(posts)
    })
    .catch(() => {
        res.send('error')
    })
});

router.get('/:id',validatePostId, (req, res) => {
db.getById(req.params.id)
.then(post => {
    res.send(post)
})
.catch(() => {
    res.send('error')
})
});

router.delete('/:id',validatePostId, (req, res) => {
db.remove(req.params.id)
.then(item => {
    res.send(item)
})
.catch(() => {
    res.send('error')
})
});

router.put('/:id',validatePostId, (req, res) => {
db.update(req.params.id, req.body)
.then(post => {
    res.send(post)
})
.catch(() => {
    res.send('error')
})
});

// custom middleware

function validatePostId(req, res, next) {
db.getById(req.params.id)
.then((post) => {
    if(post.id == req.params.id){
        next();
    }else{
        req.status(400).json({message: 'Invalid post ID'})
    }
})
.catch(() => {
res.send('error')
})
};

module.exports = router;