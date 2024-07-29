const mongoose= require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl : {
        type : String,
        required: true
    },
    shortUrl : {
        type : String,
        // default: shortId.generate // same as passing () => shortId.generate()
    },
    clicks: {
        type : Number,
        default : 0
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

const urlModel = mongoose.model('urlSchema', urlSchema);

module.exports = urlModel;