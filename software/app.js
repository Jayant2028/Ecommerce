const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{console.log("DB CONNECTED SUCCESSFULLY");})
.catch((err)=>{
    console.log("DB ERROR");
    console.log(err);
})



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // fixed
app.use(express.static(path.join(__dirname, 'public'))); //public folder

app.listen(8000, () => {
    console.log("SERVER IS ONLINE 8080");
});