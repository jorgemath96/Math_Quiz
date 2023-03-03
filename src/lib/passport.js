const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('../controllers/database');
const helpers = require('../lib/help');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const rows = await pool.query('SELECT * FROM users_quiz WHERE username = ?', [username]);
  if (rows.length >0) {
    const user = rows[0];
    const validPass = await helpers.matchPass(password, user.password);
    if (validPass) {
      done(null, user);
    } else {
      done(null, false);
    }
  } else {
    return done(null, false);
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { fullname } = req.body;
  const newUser = {
    username,
    password,
    fullname
  }
  newUser.password = await helpers.encryptPass(password);
  const reg = await pool.query('INSERT INTO users_quiz SET ?', [newUser]);
  newUser.id = reg.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const row = await pool.query('SELECT * FROM users_quiz WHERE id = ?', [id]);
  done(null, row[0]);
});