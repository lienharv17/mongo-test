const Cat = require('../models/cat.model.js');

// Create and Save a new Cat
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.color) {
        return res.status(400).send({
            message: "Cat needs: name, color"
        });
    }

    // Create a Cat
    const cat = new Cat({
        name: req.body.name,
        owner: req.body.owner || "Vicky",
        color: req.body.color,
        age: req.body.age || 0
    });

    // Save Cat in the database
    cat.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the cat."
        });
    });
};

// Retrieve and return all cats from the database.
exports.findAll = (req, res) => {
    Cat.find()
        .then(cats => {
            res.send(cats);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cats."
        });
    });
};

// Find a single cat with a catId
exports.findOne = (req, res) => {
    Cat.findById(req.params.catId)
        .then(cat => {
            if(!cat) {
                return res.status(404).send({
                    message: "Cat not found with id " + req.params.catId
                });
            }
            res.send(cat);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cat not found with id " + req.params.catId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Cat with id " + req.params.catId
        });
    });
};

// Update a cat identified by the catId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.color) {
        return res.status(400).send({
            message: "Cat needs: name, color"
        });
    }

    // Find cat and update it with the request body
    Cat.findByIdAndUpdate(req.params.catId, {
        name: req.body.name,
        owner: req.body.owner || "Michi",
        color: req.body.color
    }, {new: true})
        .then(Cat => {
            if(!Cat) {
                return res.status(404).send({
                    message: "Cat not found with id " + req.params.catId
                });
            }
            res.send(Cat);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cat not found with id " + req.params.catId
            });
        }
        return res.status(500).send({
            message: "Error updating Cat with id " + req.params.catId
        });
    });
};

// Delete a cat with the specified catId in the request
exports.delete = (req, res) => {
    Cat.findByIdAndRemove(req.params.catId)
        .then(Cat => {
            if(!Cat) {
                return res.status(404).send({
                    message: "Cat not found with id " + req.params.catId
                });
            }
            res.send({message: "Cat deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cat not found with id " + req.params.catId
            });
        }
        return res.status(500).send({
            message: "Could not delete Cat with id " + req.params.catId
        });
    });
};
