const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Profile = require("../models/Profile");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true // Required to access req.query

},
  async (req, accessToken, refreshToken, profile, cb) => {
    try {
      const accountType = req.query.state;
      let user = await User.findOne({
        googleId: profile.id,
      });

      if (!user) {
        const email =
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : null;

        // Check whether this email already belongs to a normal account
        user = await User.findOne({ email });

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.image =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : user.image;

          await user.save();
        } else {
          const names = profile.displayName.split(" ");

          const firstName = names[0];
          const lastName = names.slice(1).join(" ") || "";

          const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
          });

          // Create the user
          const approved = accountType !== "Instructor";

          user = await User.create({
            googleId: profile.id,
            firstName: firstName,
            lastName: lastName,
            accountType: accountType,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
            image: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
            additionalDetails: profileDetails._id,
            approved: approved,
          })
        }
      }
        return cb(null, user);
      } catch (error) {
        return cb(error, null)
      }
    }
));