const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const reviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    ratings : [{myrating: Number,
                postedBy:{type:ObjectId, ref:"User"} }],
    reviews : [{myreview: String,
                postedBy:{type:ObjectId, ref:"User"} }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

module.exports = mongoose.model("Review", reviewSchema)