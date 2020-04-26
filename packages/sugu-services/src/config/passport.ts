// import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

// import User, { IUser } from '../models/user';

// passport.use(
//   "local",
//   new LocalStrategy((username, password, done) => {
//     User.find({ username: username.toLowerCase() })
//       .exec()
//       .then(data => {
//         return data.find(item => item.userType.type !== 2);
//       })
//       .then((user: any) => {
//         if (!user) {
//           return done(undefined, false, {
//             message: `Email ${username} not found.`
//           });
//         }

//         if (!user.active || !user.company.active) {
//           return done(undefined, false, { message: "inactive_company" });
//         }
//         // user.comparePassword(password, (err: Error, isMatch: boolean) => {
//         user.isValidPassword(password, (err: Error, isMatch: boolean) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             user.guidToken = uuid() + "-" + user._id;
//             return done(undefined, user);
//           }
//           return done(undefined, false, {
//             message: "Invalid email or password."
//           });
//         });
//       })
//       .catch(error => {
//         return done(error);
//       });
//   })
// );

passport.use(
  'local',
  new LocalStrategy((username: string, password: string, done: function) => {
    User.findOne({ email: username })
      .then(async (user) => {
        const isCorrectPass = await user.isCorrectPassword(password);
        if (!user || !isCorrectPass) {
          return done({
            error: 'invalid_password',
          });
        }

        return done(null, user);
      })
      .catch(done);
  }),
);
