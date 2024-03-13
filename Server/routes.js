const express = require('express');
const app = express.Router();
const { getStatus } = require('./db');
const { userModel } = require('./schema');
const { Model } = require('./userSchema');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
require('dotenv').config()


app.use(express.json());

// Define Joi schema for POST /add route
const addValidationSchema = Joi.object({
    flavour: Joi.string().required(),
    taste: Joi.string().required(),
    color: Joi.string().required(),
    rating: Joi.number().required(),
    image: Joi.string().required(),
});


// Define Joi schema for PUT /updateCard/:id route
const updateValidationSchema = Joi.object({
    flavour: Joi.string(),
    taste: Joi.string(),
    color: Joi.string(),
    rating: Joi.number(),
    image: Joi.string(),
});

// GET request to get connection status
app.get('/', async (req, res) => {
    const connectionStatus = await getStatus();
    res.send(connectionStatus);
});

// POST request to add a new ice cream entity
app.post('/add', async (req, res) => {
    try {
        const { error, value } = addValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const newData = await userModel.create(req.body);
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT request to update ice cream entity by ID
app.put('/update/:id', async (req, res) => {
    try {
        const entityId = req.params.id;
        const updateData = req.body;

        const { error, value } = updateValidationSchema.validate(updateData);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updatedEntity = await userModel.findByIdAndUpdate(entityId, updateData, { new: true });

        if (!updatedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        res.json(updatedEntity);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE request to delete ice cream entity by ID
app.delete('/delete/:id', async (req, res) => {
    try {
        const entityId = req.params.id;
        const deletedEntity = await userModel.findByIdAndDelete(entityId);

        if (!deletedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        res.json({ message: 'Entity deleted successfully', deletedEntity });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET request to get ice cream entity by ID
app.get('/icecream/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const iceCreamEntity = await userModel.findById(_id);

        if (!iceCreamEntity) {
            return res.status(404).json({ error: 'Ice cream entity not found' });
        }

        res.json(iceCreamEntity);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET request to get all ice cream entities
app.get('/icecream', async (req, res) => {
    try {
        const iceCreamEntities = await userModel.find();
        res.json(iceCreamEntities);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/signup',async(req,res)=>{
    try{
        const user = await Model.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Model.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }

        
        res.status(200).json({ user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')

    res.status(200).json({message:'Logout succesful'})
})

app.post('/auth', async(req,res) => {
    try{const {username,password} = req.body
    const user = {
        "username" : username,
        "password" : password
    }
    const TOKEN = jwt.sign(user,process.env.TOKEN)
    res.cookie('token',TOKEN,{maxAge:365*24*60*60*1000})
    res.json({"acsessToken" : TOKEN})
}catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
}
});


module.exports = app;