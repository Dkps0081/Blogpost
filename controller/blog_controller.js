const Blog = require('../models/blog');

//blog_index

const blog_index = (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', { title: 'All blogs here', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_create = (req, res) => {
    res.render('create', { title: 'create' });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'det', blogs: result });
            //i am going  to create a details file format ejs file so that it can access the data from mongoDB database
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'page not found' });

        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        });
}

const blog_post = (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_create,
    blog_details,
    blog_delete,
    blog_post
}
