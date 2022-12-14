const asyncHandler=require('express-async-handler')

const User = require('../models/userModels')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModels')


// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes=asyncHandler(async (req,res)=>{

    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(401)
        throw new Error('User not found.')
    }
    const ticket  = await Ticket.findById(req.params.id)
    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const notes  = await Note.find({ticket: req.params.id})
    res.status(200).json(notes)
 })


// @desc    create notes for a ticket
// @route   post /api/tickets/:ticketId/notes
// @access  Private
const addNote=asyncHandler(async (req,res)=>{

    const user = await User.findById(req.user.id) 
    if(!user){
        res.status(401)
        throw new Error('User not found.')
    }
    const ticket  = await Ticket.findById(req.params.id)
    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const note  = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user.id,
        ticket: req.params.id})
    res.status(200).json(note)
 })

 module.exports = {
    getNotes,
    addNote,
 }

 