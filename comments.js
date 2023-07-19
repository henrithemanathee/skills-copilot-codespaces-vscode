// Create web server var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')
var upload = multer()
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var url = 'mongodb://localhost:27017/test'
var db = mongoose.connect(url)
var commentSchema = new Schema({
    name: String,
    comment: String
})
var Comment = mongoose.model('Comment', commentSchema)

// use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// use multer
app.use(upload.array())
app.use(express.static('public'))

// set view engine
app.set('view engine', 'ejs')

// GET request
app.get('/', function (req, res) {
    res.render('comments', { comments: comments })
})

// POST request
app.post('/', function (req, res) {
    var newComment = new Comment(req.body)
    newComment.save(function (err, result) {
        if (err) throw err
        console.log(result)
        res.redirect('/')
    })
})

// GET request
app.get('/get-data', function (req, res) {
    Comment.find({}, function (err, result) {
        if (err) throw err
        res.render('comments', { comments: result })
    })
})

// PUT request
app.put('/update-data', function (req, res) {
    Comment.findOneAndUpdate({ name: 'John' }, { name: 'Smith' }, function (err, result) {
        if (err) throw err
        console.log(result)
        res.send('Successful update')
    })
})

// DELETE request
app.delete('/delete-data', function (req, res) {
    Comment.findOneAndRemove({ name: 'Smith' }, function (err, result) {
        if (err) throw err
        console.log(result)
        res.send('Successful delete')
    })
})

// listen to port 3000
app.listen(3000, function () {
    console.log('Server running on port 3000')
})