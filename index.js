const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./router/user.router');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');
const { localAuth } = require('./middleware/blog.auth');
(async () => {
    await connectDB();
    localAuth(passport);
    const app = express();
    const port = 8888;
    app.use(session({
        secret: 'your_secret_key', // Replace with your own secret key
        resave: false,
        saveUninitialized: true,
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use("/uploads", express.static('uploads'));
    app.use(cookieParser());
    app.use(router);
    app.use(passport.session());
    app.use(passport.initialize());
    app.listen(port, (err) => {
        if (err) {
            console.error('Error starting server:', err);
        } else {
            console.log(`Server is running on port http://localhost:${port}`);
        }
    });
})();
