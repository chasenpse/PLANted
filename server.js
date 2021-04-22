require('dotenv').config()

const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const confirmRoute = require('./routes/confirm');
const logoutRoute = require('./routes/logout');
const resetRoute = require('./routes/reset');
const userRoute = require('./routes/users');
const cropRoute = require('./routes/crops');
const instanceRoute = require('./routes/instances');

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
}))

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const requireLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({error: 'Not logged in'});
    }
    next();
}

app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(true)
    } else {
        res.status(200).json(false)
    }
});

app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/confirm', confirmRoute);
app.use('/api/reset', resetRoute);
app.use('/api/logout', requireLogin, logoutRoute);
app.use('/api/users', requireLogin, userRoute);
app.use('/api/crops', requireLogin, cropRoute);
app.use('/api/instances', requireLogin, instanceRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
