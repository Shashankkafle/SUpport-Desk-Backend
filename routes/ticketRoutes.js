const express  = require('express')
const router = express.Router()

const {getTickets, createTicket, getTicket, deleteTicket, updateTicket} = require('../controllers/ticketController')

const {protect} = require('../middlewear/authMiddlewear')

//reroute into note router
const noteRouter = require('./noteRoutes')
router.use('/:id/notes',noteRouter)

router.route('/').get(protect,getTickets).post(protect,createTicket)
router.route('/:id')
.get(protect,  getTicket)
.delete(protect, deleteTicket)
.put(protect, updateTicket)


module.exports = router