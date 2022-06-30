const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogschema = new Schema({
    title: { //these are objects defined
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const blog = mongoose.model('Blog', blogschema);
module.exports = blog;
