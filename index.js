const express = require('express');
const shortid = require('shortid');
const PORT = 5000;
const server = express();

server.use(express.json());

let users = [];

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo)

    res.status(201).json(userInfo);
})

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});