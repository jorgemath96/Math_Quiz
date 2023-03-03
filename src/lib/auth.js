module.exports = {
  isAuth(req, res, next) {
    if (req.user) {
      const user = req.user;
      return next();
    }
    return res.redirect('/api/signin');
  },

  isAuthIn(req, res, next) {
    if (!req.user) {
      return next();
    }
    return res.redirect('/api/quiz');
  }
}