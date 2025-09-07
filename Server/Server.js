  import express from "express";
  import cors from "cors";
  import "dotenv/config";
  import cookieParser from "cookie-parser";
  import session from "express-session";
  import passport from "passport";
  import { Strategy as googleStrategy } from "passport-google-oauth20";
  import connectDB from "./Config/connectDB.js";
  import googleAuth from "./Middleware/googleAuth.js";
  import user from "./Routes/userRoute.js";
  import { errorhandler } from "./Middleware/errorHandler.js";
  import propertyRoute from "./Routes/propertyRoute.js";
  import otpRouter from "./Routes/otpRoute.js";
import MongoStore from "connect-mongo";

  const app = express();

  const port = process.env.PORT || 9000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));



  const FRONTEND_URL = process.env.NODE_ENV === "production"
  ? process.env.FRONTEND_URL
  : "http://localhost:5173";

  const allowedOrigins = [FRONTEND_URL];
 

 const GOOGLE_CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.DOMAIN}/auth/google/callback`
    : `http://localhost:${port}/auth/google/callback`;

  console.log("GOOGLE_CALLBACK_URL:", GOOGLE_CALLBACK_URL);

  app.set("trust proxy", 1); 

  app.use(cors({
      origin:(origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // Debug
      callback(new Error("Not allowed by CORS"));
    }
  }, 
      credentials: true,             
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], 
      allowedHeaders: ["Content-Type", "Authorization"]
  }));


  app.use(cookieParser())

  app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);



  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${GOOGLE_CALLBACK_URL}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          return done(null, profile);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.get(
  "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
      prompt: "select_account",
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: `${FRONTEND_URL}/login`,
    }),
    googleAuth,
    (req, res) => {
      res.redirect(`${FRONTEND_URL}`);
    }
  );

  app.use('/uploads', express.static('uploads'));

    console.log(GOOGLE_CALLBACK_URL)
console.log(FRONTEND_URL)


  app.get("/",(req,res)=>{
    res.send("hello world")
  })


  app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


  app.use("/api/user",user);
  app.use("/api/property",propertyRoute);
  app.use("/api/otp",otpRouter);
  app.use(errorhandler);

  connectDB();

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
<<<<<<< Updated upstream
  });
=======
  });
// export default app;
>>>>>>> Stashed changes
