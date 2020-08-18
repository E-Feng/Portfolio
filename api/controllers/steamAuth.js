const passport = require('passport');

// @desc Authenticates Steam user
// @route GET /auth/steam
// access Public
exports.authUser = passport.authenticate('steam', {
  failureRedirect: '/',
  //successRedirect: '/patreon',
});

exports.postAuth = (req, res, next) => {
  console.log('Post Auth');
  req.session.isSteamAuthed = true;
  //console.log(req.user);
  res.redirect('/patreon');
  next();
};

exports.getUser = (req, res) => {
  console.log('Sending Steam auth user info');
  const steamData = req.user;
  if (steamData === undefined) {
    res.json(null);
  } else {
    res.json(steamData);
  }
};