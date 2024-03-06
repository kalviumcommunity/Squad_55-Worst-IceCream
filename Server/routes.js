const express = require("express")
const router = express.Router()
const {getStatus} =require('./db')
const {userModel} = require('./schema')


router.get('/', async (req, res) => {
    const connectionStatus = await getStatus()
    res.send(connectionStatus)
 })
  
  router.get('/ping', (req, res) => {
    res.send("pong");
  });


router.get("/get", (req,res)=>{
    res.send("It's a get request")
})

router.post("/post",(req,res)=>{
    res.send("It's a post request")
})

router.patch("/patch",(req,res)=>{
    res.send("It's a patch request")
})

router.delete("/delete",(req,res)=>{
    res.send("It's a delete request")
})


router.get('/icecream',async(req,res)=>{
    try{
        const test = await userModel.find()
        res.json(test)
    }catch(err){
        console.log(err)
    }
})

router.post('/add',async(req,res)=>{
    try{
        const add = userModel.create(req.body)
        res.send(data)
    }catch(err){
        console.log(err)
    }
})

module.exports = router;
