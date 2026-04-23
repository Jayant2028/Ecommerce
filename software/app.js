const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const flash = require('connect-flash');
const engine = require('ejs-mate');
const authRoutes = require('./routes/auth')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');


mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{console.log("DB CONNECTED SUCCESSFULLY");})
.catch((err)=>{
    console.log("DB ERROR");
    console.log(err);
})

// session 
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true , 
    cookie: { 
        httpOnly: true ,
        expires: Date.now() + 24*7*60*60*1000 , 
        maxAge:24*7*60*60*1000
    }
}


app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // fixed
app.use(express.static(path.join(__dirname, 'public'))); //public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

passport.use(new LocalStrategy(User.authenticate()));

//  seeding db
//  seedDB()

app.use(productRoutes); //check path for every incomeing req
app.use(reviewRoutes); //  check path for every incomeing req
app.use(authRoutes);

app.listen(8080, () => {
    console.log("SERVER IS ONLINE 8080");
});