const express = require('express')
const router=express.Router()
const{registerUser,loginUser,getUser}=require('../controllers/registerUser')
const {protect} = require('../middlewear/authMiddlewear')

router.post('/register',registerUser
)

//routes
router.post('/login',loginUser
)
router.get('/me',protect,getUser
)

module.exports=router