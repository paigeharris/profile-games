const express = require('express');
const router  = express.Router();
const User = require('../models/users.js');

router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username});
    // user.authenticate(req.body.password);
    if (user.authenticate(req.body.password)) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res.status(403).json({ err: 'Password is incorrect.'})
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete('/logout', (req, res) => {
  console.log('Session is logged out: ', req.session);
  req.session.destroy(() => {
    console.log('session has been destroyed...');
    res.status(200).json({message: 'Session destroyed'});
  });
});


router.get('/', async (req, res) => {
  try{
    const user = await User.findOne({ username: req.session.user.username});
      res.status(200).json(user);

  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});



router.get('/all', async (req, res) => {
if (req.session.user !== undefined){
  try{
    const AllUsers = await User.find();
    res.status(200).json(AllUsers); //COME BACK TO THIS!!!
  } catch (err) {
    res.status(400).json({err: err.message });
  }
} else{
  res.send('Please log in!')
}
});

module.exports = router;
