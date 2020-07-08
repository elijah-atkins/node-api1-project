const PORT = 5000;
const express = require("express");
const shortid = require("shortid");

const server = express();

let hubs = [];

// Create POST
// Read GET
// Update PUT
// Delete DELETE
// CRUD

// Get /

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ hello: "world" });
});

server.get("/hello", (req, res) => {
  res.json({ hello: "Lambda School" });
});

// Create
server.post("api/users", (req, res) => {
  const hubInfo = req.body;
  hubInfo.id = shortid.generate();
  hubs.push(hubInfo);
  res.status(201).json(hubInfo);
});

// Read
server.get("/api/hubs", (req, res) => {
  res.json(hubs);
});

// Delete
server.delete("/api/hubs/:id", (req, res) => {
  const { id } = req.param;
  const deleted = hubs.find(hub => hub.id === id);
  if (deleted) {
    hubs = hubs.filter((hub) => hub.id !== id);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: "hub not found" });
  }
});

// Update - change patch
server.patch(`/api/hub/:id`, (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    let found = hubs.find(hub => hub.id === id);

    if (found) {
        Object.assign(found, changes);
        express.status(200).json(found);
    } else {
        res.status(404).json({ message: "hub not found" });
    }

})


// Update - replace 
server.put(`/api/hubs/:id`, (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    changes.id = id;

    let index = hubs.findIndex(hub => hub.id === id);

    if (index !== -1) {
        hubs[index] = changes;
        res.status(200).json(hubs[index])

    } else {
        res.status(404).json({ message: "hub not found" });
    }
})



server.listen(PORT, () => {
  console.log("i'm listening on localhost:", PORT);
});
