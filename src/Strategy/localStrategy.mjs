import passport from "passport";
import { Strategy } from "passport-local";
import users from "../utils/users.mjs";

passport.serializeUser((findUser, done) => {
  done(null, findUser.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ passwordField: "displayName" }, (username, password, done) => {
    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) throw new Error("This user is not found");
      if (findUser.displayName !== password) throw new Error("Bad Credentiels");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
