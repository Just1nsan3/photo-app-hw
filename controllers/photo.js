const express = require('express');
const router  = express.Router();
const photo  = require('../models/photos');
const user = require('../models/users');

router.get('/', (req, res) => {
  Photo.find({}, (err, foundPhotos) => {
      res.render('photos/index.ejs', {
        photos: foundphotos
      });
  });

});


// new route

router.get('/new', (req, res)=>{
    User.find({}, (err, allUsers)=>{
        res.render('photos/new.ejs', {
            users: allUsers
        });
    });
});

// show route

router.get('/:id', (req, res)=>{
    photo.findById(req.params.id, (err, foundphoto)=>{
        user.findOne({'photos._id':req.params.id}, (err, founduser)=>{
            res.render('photos/show.ejs', {
                user:foundUser,
                photo: foundphoto
            });
        })
    });
});

router.get('/:id/edit', (req, res)=>{
  photo.findById(req.params.id, (err, foundPhoto)=>{
    user.find({}, (err, allusers)=>{
      user.findOne({'photos._id':req.params.id}, (err, foundphotouser)=>{
        res.render('photos/edit.ejs', {
          photo: foundphoto,
          users: allUsers,
          photoUser: foundphotoUser
        });
      });
    });
  });
});



router.post('/', (req, res)=>{
    user.findById(req.body.userId, (err, founduser)=>{
        photo.create(req.body, (err, createdphoto)=>{ //req.body.userId is ignored due to Schema
            founduser.photos.push(createdphoto);
            founduser.save((err, data)=>{
                res.redirect('/photos');
            });
        });
    });
});


// delete route

router.delete('/:id', (req, res)=>{
    photo.findByIdAndRemove(req.params.id, (err, foundphoto)=>{
        user.findOne({'photos._id':req.params.id}, (err, founduser)=>{
            founduser.photos.id(req.params.id).remove();
            founduser.save((err, data)=>{
                res.redirect('/photos');
            });
        });
    });
});



// update and photo we all want to update the users photos list

router.put('/:id', (req, res)=>{
    photo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedphoto)=>{
        user.findOne({ 'photos._id' : req.params.id }, (err, foundUser)=>{
    if(founduser._id.toString() !== req.body.userId){
      founduser.photos.id(req.params.id).remove();
      founduser.save((err, savedFoundUser)=>{
        user.findById(req.body.userId, (err, newuser)=>{
          newuser.photos.push(updatedphoto);
          newuser.save((err, savedNewUser)=>{
                        res.redirect('/photos/'+req.params.id);
          });
        });
      });
    } else {
      founduser.photos.id(req.params.id).remove();
      founduser.photos.push(updatedphoto);
      founduser.save((err, data)=>{
                    res.redirect('/photos/'+req.params.id);
      });
    }
        });
    });
});



module.exports = router;