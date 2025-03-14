const express= require('express');
const app= express();
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send(`Welcome to the Online Food Ordering System !`);
})

require('./config/db');

app.use('/api/users', require('./routes/user'));

const port= process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})