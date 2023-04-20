const { authenticateToken } = require("../Middlewares")
const { getProfile } = require("./controller")

const router = require("express").Router()


router.get("/", authenticateToken, getProfile)


module.exports = router