const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// POST route for creating a new user
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();

        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// PUT route for updating user data
router.put("/update", auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findById(req.user._id);
        if (!user)
            return res.status(404).send({ message: "User not found!" });

        if (req.body.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        Object.assign(user, req.body);
        await user.save();

        res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// GET route to get user data
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
