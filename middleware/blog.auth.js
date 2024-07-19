const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const userDb = require('../models/user.schema')

const userAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
}
const localAuth = (passport) => {
    passport.use(new LocalStrategy(
        { usernameField: 'email' }, // Specify email as the username field
        async (email, password, done) => {
            try {
                let user = await userDb.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user, { message: `Welcome ${user.email}` });
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userDb.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}

module.exports = { localAuth, userAuth };

