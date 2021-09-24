
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = mongoose.model("Review")
const authMiddleware = require('../middleware/authMiddleware');


router.get('/allreviews/:id',(req, res) =>{
    Review.find({id:req.params.id})
    .populate("reviews.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .then((review) => res.json(review))
    .catch((err) => console.error(err))
})

router.put('/addreview',authMiddleware,(req,res)=>{

    const review = {
        myreview:req.body.clientreview,
        postedBy:req.user._id
    }

    if(req.body.clientreview == null){
        Review.findOneAndUpdate({id:req.body.userid},{
            new:true
        })
        .populate("reviews.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
    }else{
    Review.find({id:req.body.userid})
    .then((mydata)=>{
        if(JSON.stringify(mydata) === '[]') {
            const newreview = new Review({
                id:req.body.userid,
                reviews: [],
                postedBy:req.user._id
            })
            
            newreview.save()
            .then( user => {
                console.log('user',user)
                Review.findOneAndUpdate({id:req.body.userid},{
                    $push:{reviews:review}
                },{
                    new:true
                })
                .populate("reviews.postedBy", "_id name")
                .populate("postedBy", "_id name")
                .exec((err,result)=>{
                    if(err){
                        return res.status(422).json({error:err})
                    }else{
                        console.log('resi')
                        res.json(result)
                    }
                })
            })
            .catch(err => console.error(err))

        }else{
            Review.findOneAndUpdate({id:req.body.userid},{
                $push:{reviews:review}
            },{
                new:true
            })
            .populate("reviews.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .exec((err,result)=>{
                if(err){
                    return res.status(422).json({error:err})
                }else{
                    console.log('resi')
                    res.json(result)
                }
            })
        }
        })
        .catch(err => console.error(err))
        }
    })



router.put('/addrating',authMiddleware,(req,res)=>{

        const rating = {
            myrating:req.body.rating,
            postedBy:req.user._id
        }
    
        if(req.body.rating == null){
            Review.findOneAndUpdate({id:req.body.userid},{
                new:true
            })
            .populate("ratings.postedBy", "_id name")
            .populate("postedBy", "_id name")
            .exec((err,result)=>{
                if(err){
                    return res.status(422).json({error:err})
                }else{
                    res.json(result)
                }
            })
        }else{
        Review.find({id:req.body.userid})
        .then((mydata)=>{
            if(JSON.stringify(mydata) === '[]') {
                const newrating = new Review({
                    id:req.body.userid,
                    ratings: [],
                    postedBy:req.user._id
                })
                
                newrating.save()
                .then( user => {
                    console.log('user',user)
                    Review.findOneAndUpdate({id:req.body.userid},{
                        $push:{ratings:rating}
                    },{
                        new:true
                    })
                    .populate("ratings.postedBy", "_id name")
                    .populate("postedBy", "_id name")
                    .exec((err,result)=>{
                        if(err){
                            return res.status(422).json({error:err})
                        }else{
                            console.log('resi')
                            res.json(result)
                        }
                    })
                })
                .catch(err => console.error(err))
                
            }else{
                Review.findOneAndUpdate({id:req.body.userid},{
                    $push:{ratings:rating}
                },{
                    new:true
                })
                .populate("ratings.postedBy", "_id name")
                .populate("postedBy", "_id name")
                .exec((err,result)=>{
                    if(err){
                        return res.status(422).json({error:err})
                    }else{
                        console.log('resi')
                        res.json(result)
                    }
                })
            }
            })
            .catch(err => console.error(err))
            }
        })
module.exports = router;