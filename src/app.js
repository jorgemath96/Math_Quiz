// Construyendo la App...
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;
require('./lib/passport')
const isAuth = require('./lib/auth');


// Motor de plantilla...
const exphbs = require('express-handlebars');
const { database } = require('./keys');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + "/public"));


// Middleares...
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'nodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))
app.use(passport.initialize());
app.use(passport.session());


// Variables Globales
app.use((req, res, next) => {

  app.locals.user = req.user;
  next();
});


// Rutas...
app.use('/api/quiz', isAuth.isAuth, require('./routes/quiz.js'));
app.use('/api', require('./routes/authentication.js'));
// app.use('', (req, res) => { res.redirect('/api/signin') });

// Iniciando App...
app.listen(port, () => {
  console.log(`La App se inició en el puerto: ${port}`);
});