const express = require('express')
const router = express.Router()

// all aiuthor routes
router.get('/', (req, res) => {
    res.render('authors/index')
})


// new author routes
router.get('/new', (req, res) => {
    res.render('authors/new')
})

// create author route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router