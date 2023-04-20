const { authenticateToken } = require("../Middlewares")
const { getProfile, followOrUnFollowUser, getAvailableUserProfiles, updateProfile } = require("./controller")

const router = require("express").Router()


router.get("/:username", authenticateToken, getProfile)
router.post("/follow-unfollow-user", authenticateToken, followOrUnFollowUser)
router.put("/update", authenticateToken, updateProfile)
router.get("/users/all", authenticateToken, getAvailableUserProfiles)

module.exports = router