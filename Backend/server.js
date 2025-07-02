const express = require('express')
require(`dotenv`).config();
const authRoutes = require('./routes/authRoutes')
const postRoute = require('./routes/postRoute')
const mongoose = require('mongoose');
const cors = require('cors');
const adminUserRoutes = require('./routes/adminUserRoutes');


//express app
const app = express()

// middleware
app.use((req , res , next) =>{
    console.log(req.path , req.method)
    next()
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());

//routes
app.use('/api/auth' ,authRoutes )
app.use('/api/admin/post' , postRoute)
app.use('/api/admin/users', adminUserRoutes)

app.get('/' , (req ,res) =>{
    res.json({mssg:"welcome to the backend admin"})
})


//connect to mongo DB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log(' server is running  on port', process.env.PORT)
        })
    }).catch((error) => {
        console.log(error)
    });
