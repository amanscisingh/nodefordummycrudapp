const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/usermodel.js');



MONGO_URI = "mongodb+srv://dummy:dummy@cluster0.iw35r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Start the server
const app = express();

// enable cors
app.use(cors());

// enable body parser
app.use(bodyParser.json());

// connecting to mongoDb
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> {
    app.listen(PORT, console.log(`Server running on port ${PORT} and DB is connected as Well!!! `))
}).catch((err)=>{
    console.log('Error: ', err.message);
})

const PORT = 3004;


// route for all users /users
app.get('/users', async (req, res) => {
    const users = await User.find().lean();
    res.json(users);
});

//route for single user /api/user/:id
app.get('/api/user/:id', async (req, res)=> {
    const id = req.params.id;
    const data = await User.findById( id ); 
    res.json(data);
})

// route for post /api/user
app.post('/api/add', async (req, res) => {
    console.log(req.body);
    const data = req.body.user;
    const user = await User(data);
    user.save().then(()=>{ console.log('data saved'); })
    res.json(req.body);
});

// route for /api/delete/:id
app.delete('/api/delete/:id', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id ).then(()=> {
        console.log('deleted');
    })
});


// route for /api/update/:id
app.put('/api/update/:id', async (req, res) => {
    const id = req.params.id;
    var data = req.body.user;
    data = await User.findByIdAndUpdate(id, data).then(()=>{
        console.log('updated...');
    });
    res.json(data);
});
