import passport from "passport";

import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

class Passport {
  /**
   * Creates Passport instance
   * @param {Object} UserModel Mongoose User Model
   * @param {Object} logger logger
   */
  constructor(UserModel, logger) {
    this.UserModel = UserModel;
    this.logger = logger;
  }

  /**
   * Initialize jwt strategy
   */
  useJwtStrategy() {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
      new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
          const user = await this.UserModel.findById(payload.id);
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        } catch (err) {
          return done(err, false);
        }
      })
    );
  }

  /**
   * Initialize app to use passport and google auth
   * @param {app} app express app
   */
  async initialize(app) {
    app.use(passport.initialize());

    await this.googleAuth();
  }

  /**
   * Setup passport's google auth
   */
  async googleAuth() {
    try {
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}${process.env.GOOGLE_CALLBACK_URL}`,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              const user = await this.UserModel.findOne({
                email: profile.email,
              });
              if (user) {
                return done(null, user);
              }

              const name = profile.displayName.split(" ");

              const newUser = new this.UserModel({
                userProvider: "google",
                email: profile.email,
                googleId: profile.id,
                firstName: name[0],
                lastName: name[1],
                profilePicture: profile.picture,
                password: null,
              });

              const savedUser = await newUser.save();
              if (savedUser) {
                return done(null, savedUser);
              }
            } catch (err) {
              return done(err, false);
            }
          }
        )
      );
    } catch (err) {
      this.logger.error("Google credentials are missing.");
    }
  }
}

export default Passport;
