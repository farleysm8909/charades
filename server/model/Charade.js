import { readFile } from 'fs/promises';
import mongoose from "mongoose";

const dbConfig = JSON.parse(await readFile(new URL('../config/mongo_config.json', 
                                                   import.meta.url)));

const connection = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
mongoose.connect(connection);

// make sure MongoDB server is running --> windows search bar --> type "services" --> enable/start MongoDB
const Schema = mongoose.Schema;

const Charade = new Schema({
    word:               {type: String, required: true},
    author:             {type: String, required: true},
    used:               {type: Boolean, default: false}
});

const CharadeModel = mongoose.model("CharadeModel", Charade);


export { CharadeModel as Charade };