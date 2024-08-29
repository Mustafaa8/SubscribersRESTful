const express = require('express')
const Subscriber = require('../models/Subscriber.js')
const mongoose = require('mongoose')
const subrouter = express.Router()

const getSub = async (req,res,next)=>{
    try {
    const sub = await Subscriber.findById(req.params.id) 
    if(!sub){
        return res.status(404).json({"message":"user Doesn't exist"})
    }
    res.subscriber = sub
} catch(err){
    res.status(500).json({"message": err.message})
}
    next()
}

// Getting all subs
subrouter.get('/',async (req,res)=>{
    try{
        const allSubs = await Subscriber.find({})
        res.json(allSubs)
} catch(err){
    res.status(500).json({"message":err.message})
}
})
// Getting one Sub
subrouter.get('/:id',getSub,async (req,res)=>{
    res.json(res.subscriber)
})
// Creating one sub
subrouter.post('/',async (req,res)=>{
    try{
        const {name,subscriberToChannel} = req.body
        await Subscriber.create({name:name,subscriberToChannel:subscriberToChannel})
        res.status(201).json({"Message":"Sub added Successfully"})
    } catch(err){
        res.status(400).json({"message": err.message})
    }
})
// Updating subs
subrouter.patch('/:id',getSub,async (req,res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel != null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try{
        const updatedSub = await res.subscriber.save()
        res.status(200).json({"message":"Done Successfully"})
    }catch(err){
        res.status(500).json({"message":err.message})
    }
})
// Deleting subs
subrouter.delete('/:id',getSub, async (req,res)=>{
    try{
        await Subscriber.findByIdAndDelete(res.subscriber._id)
        res.status(200).json({"message":"Done Successfully"})
    } catch(err){
        res.status(500).json({"message":err.message})
    }
}) 

module.exports = subrouter;


