const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const connectDB = require('./config/db');
require('dotenv').config({ path: './config/.env' });

// Setting up express app
const app = express();

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || 'development';

app.use(
  session({
    secret: 'Secret',
    name: 'Test',
    resave: true,
    saveUninitialized: true,
  })
);

// Constants
let returnURL;
let realm;

if (environment === 'development') {
  returnURL = 'http://localhost:5000/auth/steam/';
  realm = 'http://localhost:5000/';
} else {
  returnURL = 'http://elvinfeng.com/auth/steam/';
  realm = 'http://elvinfeng.com';
}

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Setting up Steam OID with passportjs
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: returnURL,
      realm: realm,
      apiKey: process.env.STEAM_KEY,
    },
    (identifier, profile, done) => {
      console.log('Successful log in from Steam');
      console.log('Username', profile.displayName);
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use(express.json());
app.use('/api/message/', require('./routes/message'));
app.use('/api/chat/', require('./routes/chat'));
app.use('/auth/', require('./routes/auth'));

app.get('*', (req, res) => {
  res.status(404).send('404 Error');
});

// Serving content
// if (environment === 'development') {
//   app.use(express.static('../client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '..', 'client', 'build', 'index.html')
//     );
//   });
// } else {
//   app.use((req, res, next) => {
//     res.send('Welcome to Express');
//   });
// }

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
