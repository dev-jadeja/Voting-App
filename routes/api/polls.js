const express = require("express");
const route = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Poll = require("../../models/Poll");

route.post(
	"/",
	[
		auth,
		[
			check("question", "Question is required").not().isEmpty(),
			check("choices", "Choices are required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPoll = new Poll({
				question: req.body.question,
				username: user.username,
				email: user.email,
				user: req.user.id,
				choices: req.body.choices,
			});

			const poll = await newPoll.save();

			res.json(poll);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("server error");
		}
	}
);

route.get("/:id", auth, async (req, res) => {
	try {
		const poll = await Poll.findById(req.params.id);
		if (!poll) {
			return res.status(404).json({ msg: "Poll not found" });
		}
		res.json(poll);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Poll not found" });
		}
		res.status(500).send("Server Error");
	}
});

route.delete("/:id", auth, async (req, res) => {
	try {
		const poll = await Poll.findById(req.params.id);

		if (!poll) {
			return res.status(404).json({ msg: "Poll not found" });
		}

		if (poll.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}
		await poll.remove();
		res.json({ msg: "Poll removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Poll not found" });
		}
		res.status(500).send("Server Error");
	}
});

route.put('/vote/:pollid/:choiceid', auth, async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.pollid);

        if(poll.voters.filter(voter => req.user.id === voter.user.toString()).length > 0) {
            return res.status(400).json({ msg: "Already voted " })
        }

        for(let choice of poll.choices) {
            if(choice._id.toString() === req.params.choiceid) {
                choice.votes += 1;
                break;
            }
        }

        poll.voters.push({ user: req.user.id });

        await poll.save();

        res.json(poll);

    } catch(err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
})

module.exports = route;
