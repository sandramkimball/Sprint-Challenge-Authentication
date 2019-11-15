const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
  .then(saved=> {
    req.session.username = saved.username;
    res.status(201).json(saved);
  })
  .catch(err=> {
    res.status(500).json(err);
  })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Users.findBy({username})
  .first()
  .then(user=> {
    if(user && bcrypt.compareSync(password, user.password)){
      req.session.username = user.username;
      res.status(200).json({
        message: `Punny to see here, ${user.username}.`
      })
    } else {
      res.status(401).json({message: 'Invalid credentials.'})
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

module.exports = router;
