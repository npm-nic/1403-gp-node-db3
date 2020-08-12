const express = require("express");
const helmet = require("helmet");

const UserRouter = require("../users/user-router.js");
const db = require("../data/db-config.js"); //  [1]

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", UserRouter);

server.get("/api/posts", (req, res) => {
  //  [2]
  db("posts as p")
    .join("users as u", "p.user_id", "=", "u.id")
    .select("p.contents as Quote", "u.username as Author")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = server;

//  [2]
//  select p.* from u.username
//  from Posts as p
//  join Users as u
//  on p.user_id = u.id