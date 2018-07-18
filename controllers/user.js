const express = require('express');
const router  = express.Router();
const user  = require('../models/users');


// index route
router.get('/', (req, res) => {
  user.find({}, (err, foundUsers) => {
      res.render('users/index.ejs', {
        users: foundUsers
      });
  });

});


// user new route
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});


// show route
router.get('/:id', (req, res) => {
  user.findById(req.params.id, (err, foundUser) => {
    res.render('users/show.ejs', {
      user: founduser
    });
  });
});


// edit route
router.get('/:id/edit', (req, res) => {

  user.findById(req.params.id, (err, foundUser) => {
    res.render('users/edit.ejs', {
      user: founduser
    });
  });

});




router.put('/:id', (req, res) => {
  user.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser)=> {
    console.log(updatedUser, ' this is updateduser');
    res.redirect('/users');
  });
});

// user create route
router.post('/', (req, res) => {
  console.log(req.body)
  user.create(req.body, (err, createdUser) => {
    console.log(createdUser, ' this is the createduser');
    res.redirect('/users');
  });

});



// delete an user delete the associated passwords
router.delete('/:id', (req, res) => {

  user.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    console.log(deletedUser, ' this is deleteduser');
    // we are collecting all of the password ids from the deletedusers
    // passwords property

    const passwordsIds = [];
    for(let i = 0; i < deleteduser.passwords.length; i++){
      passwordIds.push(deleteduser.passwords[i].id);
    }

    password.remove({
      _id: {$in: passwordIds}
    }, (err, data) => {
    res.redirect('/users')
    });
  });
});



module.exports = router;