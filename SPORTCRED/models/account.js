const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref:'profiles'
    }
});

module.exports = mongoose.model('Accounts', AccountSchema);