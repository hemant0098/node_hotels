const express = require("express");
const router = express();

const Person = require("./../models/person.js");


router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:workType", async (req, res) => {

    try {
        const workType = req.params.workType;
        if (workType === "chef" || workType === "waiter" || workType === "manager") {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        }
    } catch (err) {
        console.log(err, "workType param error");
        res.status(404).json({ error: "internal server error" });
    }
});

router.put("/:id",async (req,res)=>{
    try{
     const personId = req.params.id;
     const updatePersonData = req.body;
     const response = await Person.findOneAndUpdate({mobileNo:personId},updatePersonData,{
        new:true,
        runValidators:true
     })
     if(!response){
        res.status(404).json({error:"person not found"})
     }else{
        res.status(200).json(response);
     }
    }catch(err){
     console.log(err,"error is person moddification");
     res.status(404).json({err:"internal server error"})
    }
})


module.exports = router;