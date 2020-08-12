//  get list of users
//  CRUD users

const db = require("../data/db-config");

//  above the fold
module.exports = {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
};
//  implementation

function getUsers() {
  return db("users");
}

function getUserByID(id) {
  return db("users").where({ id }).first(); //  [1]
}

function addUser(user) {
  return (
    db("users")
      .insert(user)
      .returning("id") // [2b]
      //  [2a]
      .then(([id]) => {
        return getUserByID(id);
      })
  );
}

function updateUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return getUserByID(id);
    });
}

function deleteUser(id) {
  return db("users").where({ id }).del();
}

//  [1]
//  first() --> picks first element in returned arry
//  all calls to database returns an arry
//  this is noteworthy 👀 because you always are returned an array
//  --> nothing: empty array
//  --> one: array with one element
//  --> many: array with all elements

//  [2]
//  [a] we get back a collection of ids --> just one in an array
//  --> destructure id in place (above)
//  --> OR .then((ids))=>{return getUserByID(id[0])}
//  [b] not needed in SQLite but gets things ready for production (Postgres)
