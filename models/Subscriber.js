const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const SubSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    subscriberToChannel:{
        type:[String],
        required:true
    },
    subscribeDate:{
        type:String,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber',SubSchema)