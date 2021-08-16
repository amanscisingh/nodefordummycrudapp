const mongoose = require('mongoose');


const User = new mongoose.Schema({
    // id : {
    //     type: String,
    //     require: true
    // },
    name : {
        type: String,
        default: 'Default Name',
    },
    username : {
        type: String,
        require: true
    },
    phone : {
        type: String,
    },
    email : {
        type: String,
        require: true
    }
}, { collections: 'users' } );

module.exports = mongoose.model('User', User);