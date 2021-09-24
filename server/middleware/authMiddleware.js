const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const JWTURI = "fdfdio@4545f@34fd";


module.exports = (req,res,next) => {
    const { authorization } = req.headers;
    if(!authorization){
        res.status(401).json({error: 'You must be logged in na'})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWTURI, (err, payload) => {
        if(err){
            return res.status(401).json({error: "You must be logged in"})
        }
        const {_id} = payload;
        User.findById(_id)
        .then(userData => {
            req.user = userData;
            next();
        })
        
    })

}