require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Imports Routes 
const {authRoute: authRoutes} = require('./routes/authRoute');
const { dashboardRoute } = require('./routes/dashboardRoute');
const { postRoute } = require('./routes/postRoutes');
const { HomeFetch } = require('./routes/homeFetch');


//mongodb uri
const MonngoDBUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@write-something.qgvdg1n.mongodb.net`


//Middleware Array
const middleware = [
    morgan(),
    express.urlencoded({extended: true}),
    express.json(),
    cors(),
    cookieParser(),
]
app.use(middleware)

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoute)
app.use('/post', postRoute)
app.use('/home', HomeFetch)

app.get('/', (req, res) =>{
    res.send('Server is Running')

})

mongoose.connect(MonngoDBUrl,{
    useNewUrlParser: true
})
.then(() => {
    app.listen(PORT, () => {
            console.log(`Server is Running on Port ${PORT}`);
    })
}).catch(e =>{
    return console.log(e);
})
