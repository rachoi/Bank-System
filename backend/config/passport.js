// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const connection = require('./database');
// const User = connection.models.User;

const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
    //email and password passed into authenticate user comes from the input fields
    const authenticateUser =  async (email, password, done) => {
        const user = await getUserByEmail(email);
        if(user == null) {
            return done(null, false, {message: 'No user with that email'});
        }
        try {
            console.log("Comparing " + user.email + " and " + email);
            if(await bcrypt.compare(password, user.password)) {
                console.log("Password match");
                console.log("Setting user: " + user);
                return done(null, user);
            } else {
                console.log("Password does not match");
                return done(null, false, {message: 'Password incorrect'});
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));

    /* passport.serializeUser(function(user,done) {
        done(null, user.id);  
    }) */ 
    //alternatively
    passport.serializeUser((user, done) => {
            console.log("Saving id to session");
            done(null, user._id) //user.id is saved to req.session.passport.user and sent to deserializeUser
        }
    );
    

    passport.deserializeUser((id, done) => {
        console.log("Looking for id: " + id);
        const user = User.findById(id);
        return done(null, user); //user object attached to req.user through getUserById
     });
}

module.exports = initialize;