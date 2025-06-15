const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema)

/**
 * mongoose wil make e lower and wil make it plural voor the collection (employees)
 * The model Employee is for the employees collection 
 */