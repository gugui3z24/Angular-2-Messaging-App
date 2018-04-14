const env = require('./config/env').setEnvironment();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config/db').connection;
const secret = require('./config/db').secret;
const sessionExpire = require('./config/db').expire;
const sessionStore = require('./config/db').sessionStore;
const session = require('express-session');
const io = require('socket.io')(server);
require('./config/socket')(io);
const RegisterController = require('./api/controllers/register/register-controller')(express.Router(), config);
const AuthenticationController = require('./api/controllers/authentication/authentication-controller')(express.Router(), config);
const MessageController = require('./api/controllers/message/message-controller')(express.Router(), config, io);
const SentController = require('./api/controllers/sent/sent-controller')(express.Router(), config);
const DraftController = require('./api/controllers/draft/draft-controller')(express.Router(), config);
const UserController = require('./api/controllers/user/user-controller')(express.Router(), config);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../dist'));
app.use(cors({
  origin: process.env.corsConfigOrigin,
  methods: process.env.corsConfigMethods
}));
app.use(session({
  'secret': secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: sessionExpire
  }
}));
app.use(bodyParser.json());
app.use('/api/register', RegisterController);
app.use('/api/authentication', AuthenticationController);
app.use('/api/message', MessageController);
app.use('/api/sent', SentController);
app.use('/api/draft', DraftController);
app.use('/api/user', UserController);

app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.send('Currently running in development mode.');
  } else {
    res.sendFile('index.html', { root: 'dist/' });
  }
});

server.listen(port, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode. Server listening on port ${port}`);
});
