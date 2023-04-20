const uuid = require("uuid")
const Following = require("../../Schemas/following")
const Profile = require("../../Schemas/profile")


const getProfile = async (req, res) => {
    const { username } = req.params
    try {
        const userProfile = await Profile.findOne({ username: username })
        if (!userProfile) {
            res.status(403)
            res.send("profile not available")
            return
        }
        console.log(userProfile)
        const followersCount = await Following.countDocuments({ followingId: userProfile.id })
        res.send({ userProfile, followersCount })
    }
    catch (error) {

        res.status(400)
        res.send({ error })
    }

}

const updateProfile = async (req, res) => {
    const { profileFields } = req.body
    try {
        const profile = await Profile.findOne({ id: req.id });
        if (profileFields.id !== req.id) {
            res.status(400)
            res.send("cannot update others details")
            return
        }
        profile.username = profileFields.username || profile.username;
        profile.firstName = profileFields.firstName || profile.firstName;
        profile.lastName = profileFields.lastName || profile.lastName;
        profile.email = profileFields.email || profile.email;
        profile.aboutMe = profileFields.aboutMe || profile.aboutMe;
        profile.gender = profileFields.gender || profile.gender;
        profile.linkedIn = profileFields.linkedIn || profile.linkedIn;
        profile.facebook = profileFields.facebook || profile.facebook;
        profile.github = profileFields.github || profile.github;
        profile.twitter = profileFields.twitter || profile.twitter;
        profile.instagram = profileFields.instagram || profile.instagram;
        profile.website = profileFields.website || profile.website;
        profile.highestEducation = profileFields.highestEducation || profile.highestEducation;
        profile.currentPosition = profileFields.currentPosition || profile.currentPosition;

        // Save the updated profile
        await profile.save();
        res.send('Profile updated successfully');
        return
    } catch (error) {
        res.status(400)
        res.send('Error updating profile');
        return
    }
}


const getAvailableUserProfiles = async (req, res) => {
    try {
        let followingList = await Following.find({ followerId: req.id }, {
            followingId: 1,
        })

        followingList = followingList.map((each) => (each.followingId))


        let followingUsers = await Profile.find({ id: { $in: followingList } });
        let unFollowedUsers = await Profile.find({ id: { $nin: followingList, $ne: req.id } })

        followingUsers = followingUsers.map((each) => ({
            ...each._doc,
            isFollowing: true
        }))


        unFollowedUsers = unFollowedUsers.map((each) => ({
            ...each._doc,
            isFollowing: false
        }))

        let users = followingUsers.concat(unFollowedUsers)

        res.send({ users })

    } catch (error) {
        console.log(error)
        res.status(400)
        res.send({ error })
    }
}


const followOrUnFollowUser = async (req, res) => {
    const { followingId } = req.body

    try {
        const isAlreadyFollowing = await Following.findOne({ followerId: req.id, followingId })

        if (isAlreadyFollowing) {
            isAlreadyFollowing.deleteOne()
            res.send({ msg: "successfully unfollowed" })
            return
        } else {
            const obj = new Following({ _id: uuid.v4(), followerId: req.id, followingId })
            obj.save()

            res.send({ msg: "successfully followed" })
        }

    } catch (error) {
        res.status(400)
        res.send({ error })
    }


}

module.exports = { getProfile, followOrUnFollowUser, getAvailableUserProfiles, updateProfile }