const express = require('express');
const router  = express.Router();

const User = require('../models/users.js');

router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username});
    user.authenticate(req.body.password);
    if (user.authenticate(req.body.password)) {
      res.status(200).json(user);
    } else {
      res.status(403).json({ err: 'Forbidden'})
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete('/logout', (req, res) => {
  console.log('Session is logout: ', req.sessions);
  req.session.destroy(() => {
    console.log('session has been destroyed...');
    res.status(200).json({message: 'Session destroyed'});
  });
});

module.exports = router;
