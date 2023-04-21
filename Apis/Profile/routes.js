const { authenticateToken } = require("../Middlewares")
const { getProfile, followOrUnFollowUser, getMyFollowersList, getAvailableUserProfiles, updateProfile, addDeleteInterests, getMyInterests } = require("./controller")

const router = require("express").Router()


router.get("/:username", authenticateToken, getProfile)
router.get("/followers/:username", authenticateToken, getMyFollowersList)
router.post("/follow-unfollow-user", authenticateToken, followOrUnFollowUser)
router.put("/update", authenticateToken, updateProfile)
router.get("/users/all", authenticateToken, getAvailableUserProfiles)
router.get("/interests/mine", authenticateToken, getMyInterests)

router.post("/add-delete-interest", authenticateToken, addDeleteInterests)
module.exports = router