const express = require("express")
const router = express.Router()

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

module.exports = router;
