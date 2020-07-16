const express = require("express");
const route = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Poll = require("../../models/Poll");
const { check, validationResult } = require("express-validator");

route.get("/", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["username", "email"]);

		if (!profile) {
			return res
				.status(400)
				.json({ msg: "There is no profile for this user" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

route.post(
	"/",
	[
		auth,
		[
			check("name", "Name is required").not().isEmpty(),
            check("gender", "Gender is required").not().isEmpty(),
            check("location", "Location is required").not().isEmpty()
		]
	],
	async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name, location, website, gender} = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        
        if(name) profileFields.name = name;
        if(location) profileFields.location = location;
        if(website) profileFields.website = website;
        if(gender) profileFields.gender = gender;

        try {

            let profile = await Profile.findOne({ user: req.user.id });

            if(profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile);
            }

            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile)

        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    }
);

route.delete('/', auth, async (req, res) => {
    try {

        //delete the polls too.

        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        await Poll.deleteMany({ user: req.user.id });

        res.json({msg: "User Deleted"});

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = route;
