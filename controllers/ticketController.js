const asyncHandler=require('express-async-handler')

const User = require('../models/userModels')
const Ticket = require('../models/ticketModels')


// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets=asyncHandler(async (req,res)=>{

    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(402)
        throw new Error('User not found.')
    }
    const tickets  = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
 })

 // @desc    Get user tickets
// @route   GET /api/tickets/:id
// @access  Private
const getTicket=asyncHandler(async (req,res)=>{
    
    console.log(req.user.id)
    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(402)
        throw new Error('User not found.')
    }
    const ticket  = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString()!=req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }
    res.status(200).json(ticket)
 })



// @desc    Get user tickets
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket=asyncHandler(async (req,res)=>{

    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(402)
        throw new Error('User not found.')
    }
    const ticket  = await Ticket.findById(req.params.id)
    if(!ticket){
        throw new Errror('Ticket not found')
    }
    if(ticket.user.toString()!=req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }
    await ticket.remove()
    res.status(200).json({sccess: true})
 })


  // @desc    update user tickets
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket=asyncHandler(async (req,res)=>{
    console.log(req)
    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(402)
        throw new Error('User not found.')
    }
    const ticket  = await Ticket.findById(req.params.id)
    if(!ticket){
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString()!=req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedTicket)
 })




// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket=asyncHandler(async (req,res)=>{
    const {product, description}  = req.body
    if(!product||!description){
        res.status(400)
        throw new Error('Product and descripton required.')
    }
    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(402)
        throw new Error('User not found.')
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new',
    })
    res.status(201).json(ticket)
 })
 
 module.exports = {getTickets, createTicket, getTicket, deleteTicket, updateTicket}