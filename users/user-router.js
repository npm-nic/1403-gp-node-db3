const userRouter = require("express").Router();
const UsersModel = require("./user-model");

// // --> GET /api/users <-- // //
userRouter.get("/", (req, res) => {
  UsersModel.getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

// // --> GET /api/users/:id <-- // //
userRouter.get("/:id", (req, res) => {
  const req_id = req.params.id;

  UsersModel.getUserByID(req_id)
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: `Could not find user with id: ${req_id}` });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ message: `Its not you, its me` });
    });
});

// // --> POST /api/users <-- // //
userRouter.post("/", (req, res) => {
  const userData = req.body;
  UsersModel.addUser(userData)
    .then((added_user) => {
      added_user
        ? res.status(201).json({ added_user })
        : res
            .status(201)
            .json({ message: "thats weird...no added_user to give ya" });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ message: "Failed to create new user" });
    });
});

// // --> PUT /api/users/:id <-- // //
userRouter.put("/:id", (req, res) => {
  const req_id = req.params.id;
  const changes = req.body;

  UsersModel.updateUser(req_id, changes)
    .then((updated) => {
      updated
        ? res.json({ updated })
        : res
            .status(404)
            .json({ message: `Could not find user with id: ${req_id}` });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ message: "Failed to update user" });
    });
});

// // --> DELETE /api/users/:id <-- // //
userRouter.delete("/:id", (req, res) => {
  const req_id = req.params.id;

  UsersModel.deleteUser(req_id)
    .then((deleted) => {
      deleted
        ? res.json({ deleted })
        : res
            .status(404)
            .json({ message: `Could not find user with id: ${req_id}` });
    })
    .catch((err) => {
      err.message
        ? res.status(500).json({ error: err.message })
        : res.status(500).json({ message: "Failed to update user" });
    });
});

module.exports = userRouter;
