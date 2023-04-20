const router = require('express').Router()
const { authenticateToken } = require('../Middlewares')
const { login, register, changePassword } = require('./controller')



router.post("/login", login)
router.post("/register", register)
router.put("/change-password", authenticateToken, changePassword)



module.exports = router 