const express = require("express");
const connectDB = require("./config/db");
const usersRoute = require("./routes/api/users");
const pollsRoute = require("./routes/api/polls");
const authRoute = require("./routes/api/auth");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("hello");
});

app.use("/api/users", usersRoute);
app.use("/api/polls", pollsRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 6969;

app.listen(PORT, console.log(`server started on PORT ${PORT}`));
