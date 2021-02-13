const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
          ],
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        data: String,
        default: ''
    },
    created: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('users', UserSchema);

