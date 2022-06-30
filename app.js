const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogroutes = require('./routes/blogroutes');
//import the blog document
// const Blog = require('./models/blog');
//const blog = require('./models/blog');
//set the app
const app = express();

//connect from mongoDb
const dburl = 'mongodb+srv://gmeetclone0081:Gmeetclone0081@nodenetninjacluster.8pnk0.mongodb.net/netninja?retryWrites=true&w=majority';
//setup with mongoose
mongoose.connect(dburl)
    .then((result) => {
        console.log('connected to db');
        app.listen(3000); // listen only after connection is made as it takes some time to get connected

    })
    .catch((err) => {
        console.log(err);
    });
//use ejs to make dynamic template
app.set('view engine', 'ejs');
app.set('views', 'nodejs/views'); // to set the folder where the ejs files are

// listen 
//app.listen(3000) // it automatically set the localhost and the datatype

//middleware & static files(like css files)
app.use(morgan('dev'));
//to include css files or other middleware
app.use(express.static('nodejs/public'));
//to find request from the brower to post something
app.use(express.urlencoded({ extended: true }));
//location w.r.t current directory which has to be made public


app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path:', req.path);
    next();
});
app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});
// adding a new blog and save it to the database
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about this new blog',
        body: 'this will add some more and save this'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//printing all the blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// displaying a single blog using id
app.get('/single-blog', (req, res) => {
    Blog.findById('62b1566f6961d85d111aa5c2')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});
//we are sending blogs content from here to index.ejs
app.get('/', (req, res) => {
    
    res.redirect('/blogs');
});


app.use('/blogs', blogroutes);

app.get('/about', (req, res) => {
    
    res.render('about', { title: 'ABOUT' });
});

app.get('/about-me', (req, res) => {
    res.redirect('/about');
});





app.use((req, res) => {
    res.status(404).render('404', { title: 'error' });
});
