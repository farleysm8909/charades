import express from "express";
import { isProduction } from "../utils/common.js";
import { Charade } from "../model/Charade.js";

const router = express.Router();


// CREATE

// create charade
router.post("/", async (req, res) => {
    //validate request
    if (!req.body.word || !req.body.author) {
        return res.status(400).send({error: "Word(s) and author cannot be empty"});
    }

    const charades = await Charade.find();
    // traverse through charades to check if there is a naming conflict (words must be unique)
    for (let i = 0; i < charades.length; i++) {
        if (charades[i].word.toString().toLowerCase() == req.body.word.toString().toLowerCase()) {
            return res.status(400).send({error: "Charade already exists!"});
        }
    }

    const data = {
        word:       req.body.word,
        author:     req.body.author
    }

    const charade = new Charade(data);

    try {
        const savedCharade = await charade.save();
        res.status(200).send(savedCharade);
    } catch(err) {
        if (isProduction()) {
            console.error(err);
        }
        res.status(500).send({error: "Charade not saved."}); 
    }
});

// RETRIEVE

// get all charades
router.get("/", async (req, res) => {
    try {
        const charades = await Charade.find();
        res.status(200).send(charades);
    } catch(err) {
        res.status(404).send({error: "Charades not found!"});
    }
});

// get charades by author
router.get("/:author", async (req, res) => {
    try {
        const charades = await Charade.find({author: req.params.author.toLowerCase()});
        res.status(200).send(charades);
    } catch(err) {
        res.status(404).send({error: "Charades not found!"});
    }
});

// get random, unused charade
router.get("/play/charade", async (req, res) => {
    try {
        // Get one random document matching {a: 10} from the mycoll collection.https://stackoverflow.com/questions/2824157/random-record-from-mongodb
        // let random_charade = await Charade.aggregate([ 
        //     {$match: {used: false}},
        //     {$sample: {size: 1}}
        // ]);
        //let random_charade = await Charade.findOne({ $and: [{author: req.params.author.toLowerCase()}, {used: false}] });
        //console.log(random_charade.word);
        let count = await Charade.find({used: false}).count();
        const rand_index = Math.floor(Math.random()*count);
        const unused_charades = await Charade.find({used: false});
        let random_charade = unused_charades[rand_index];
        random_charade.used = true;
        const saved_charade = await random_charade.save();
        res.status(200).send(saved_charade);
    } catch(err) {
        res.status(404).send({error: "Random charade not found!"});
    }
});

// UPDATE

// make used = false if skipped
router.put("/:word", async (req, res) => {
    try {
        let charade = await Charade.findOne({word: req.params.word});

        charade.word        = req.body.word;
        charade.author      = req.body.author;
        charade.used        = false;         // put original back in pool of available charades by resetting used = false

        const saved_charade = await charade.save();
        res.status(200).send(saved_charade);
    } catch(err) {
        res.status(404).send({error: "Skipped charade not updated!"});
    }
});


// DELETE 

// delete recipe by name (unique)
router.delete("/:word", async (req, res) => { 
    try {
        const deletedCharade = await Charade.deleteOne({word: req.params.word}); // https://rahmanfadhil.com/express-rest-api/
        res.status(204).send({message: "Charade deleted!"});
    } catch(err) {
        res.status(404).send({error: "Charade doesn't exist!"});
    }
});


export {router as charadeRoutes};