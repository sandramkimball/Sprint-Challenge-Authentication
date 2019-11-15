module.exports = (req, res, next) => {
  if(req.session || req.session.username){
    next();
  } else {
    res.status(401).json({you: 'Dogommit! A snipe ran off with your session.'})
  }
};
