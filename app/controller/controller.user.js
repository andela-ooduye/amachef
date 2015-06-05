var User = require('../models/user');
/**
 * [exports makes all the functions accessible by other files]
 * @type {Object}
 */
module.exports = {
  
  getAllUsers: function(req, res) {

    // use mongoose to get all users in the database
    User.find(function(err, users) {

      // if there is an error retrieving, send t∏he error. nothing after res.send(err) will execute
      if (err)
        res.send(err)
      res.json(users); // return all recipes in JSON format
    });
  },
  /**
   * [createNewUser creates a new user in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createNewUser: function(req, res) {

    // create a user, information comes from AJAX request from Angular
    User.create({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email
    }, function(err, user) {
      if (err)
        res.send(err);

        res.json({message: "user has been created"});
      });
    },
  /**
   * [editUser editis a particular user in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  editUser: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);

      user.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;

      // get and return all the users after you create another
      user.save(function(err, users) {
        if (err)
          res.send(err)
        res.json({data: users});
      });
    });
  },
  /**
   * [deleteUser deletes a particula user in the database]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteUser: function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);

      // get and return all the users after you create another
      User.find(function(err, users) {
        if (err)
          res.send(err)
        res.json(users);
      });
    });
  },
  /**
   * [otherwise default refer page if no known function is returned]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  otherwise: function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  }

};
