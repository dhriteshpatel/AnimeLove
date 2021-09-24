const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const JWTURI = "fdfdio@4545f@34fd";
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/signup", (req, res) => {
    const { name, email, password} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({ error: "Please add the all fields"})
    }
    User.findOne({email: email})
    .then((savedUser) =>{
        if(savedUser){
            return res.status(422).json({error: "User exist already with this email"})
        }

        bcrypt.hash(password, 14)
        .then(hashedPassword =>{
            const user = new User({
                name,
                email,
                password: hashedPassword
            })
            user.save()
            .then( user => {
                res.json({message: "Registered succesfully"})
            })
            .catch(err => console.error(err))
        })
        

    })
    .catch(err => console.error(err))
})

router.post("/signin", (req, res) => {
    const { email, password} = req.body;
    if(!email || !password) {
       res.status(422).json({error: 'Enter Password or email'})
    }

    User.findOne({email: email})
    .then((savedUser) => {
        if(!savedUser) {
            return res.status(422).json({error: 'Invalid Email or Passwod'})
        }
        bcrypt.compare(password, savedUser.password)
        .then( doMatch => {
            if(doMatch){
                // res.json({message: 'Signed in successfully'})
                const token = jwt.sign({_id: savedUser.id}, JWTURI);
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error: 'Invalid Email or Passwordd'})
            }
            
        })
        .catch( error => console.error(error))
        
    })
})

module.exports = router;