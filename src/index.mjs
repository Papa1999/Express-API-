import express, { response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./Strategy/localStrategy.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("signedcookie"));
app.use(
  session({
    secret: "P9 the G",
    cookie: {
      maxAge: 60000 * 10,
    },
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.get("/", (request, response) => {
  response.cookie("hello", "myfirstcookie", {
    maxAge: 60000 * 10,
    signed: true,
  });
  response.status(200).send({ msg: "hello" });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
