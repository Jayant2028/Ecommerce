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
const session = require('express-session');



mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{console.log("DB CONNECTED SUCCESSFULLY");})
.catch((err)=>{
    console.log("DB ERROR");
    console.log(err);
})

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}


app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // fixed
app.use(express.static(path.join(__dirname, 'public'))); //public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession)); 
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// seeding db
// seeddb()

app.use(productRoutes); //check path for every incomeing req
app.use(reviewRoutes); //  check path for every incomeing req


app.listen(8000, () => {
    console.log("SERVER IS ONLINE 8080");
});