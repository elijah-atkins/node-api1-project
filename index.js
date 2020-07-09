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

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

server.get('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    const found = users.find(user => user.id === id);
    if (found) {
        res.status(200).json(found);
    }else {
        res.status(404).json({message: "user not found"})
    }

})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const found = users.find(user => user.id === id);
    if (found) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(found);
    }else {
        res.status(404).json({message: "user not found"})
    }
})

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});