const PORT = 5000
const express = require("express")

var server = express();

server.listen(PORT, () => {
    console.log("i'm listening on local host:", PORT);
})