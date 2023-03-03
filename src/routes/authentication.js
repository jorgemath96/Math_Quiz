const { Router } = require('express');
const router = Router();

const passport = require('passport');
const isAuth = require('../lib/auth');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/api/quiz',
  failureRedirect: '/api/signup',
  // failureFlash: true
}));


router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {passport.authenticate('local.signin', {
  successRedirect: '/api/quiz',
  failureRedirect: '/api/signin',
  //failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut((err) => {
    if (err) {return err}
    return res.redirect('/api/signin');
  });
});

module.exports = router;