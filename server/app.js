import express from "express";
import cors from "cors";
import { charadeRoutes } from "./routes/charades_route.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use("/", charadeRoutes); 

app.listen(port, () => {
    console.info(`Application Started.  Port: ${port}`);
});