const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("hello");
})

const PORT = process.env.PORT || 6969;

app.listen(PORT, console.log(`server started on PORT ${PORT}`));