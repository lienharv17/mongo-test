const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    name: String,
    owner: String,
    color: String,
    age: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('cat', CatSchema);
