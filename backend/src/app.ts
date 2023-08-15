import express from "express";
import {connect} from "mongoose";

import {errorMiddleware} from "./middlewares"
import {config} from "./config";
import {authRouter, noteRouter} from "./routes";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));
app.use("/auth", authRouter);
app.use("/notes", noteRouter);
app.use(errorMiddleware);

app.listen(config.PORT, async () => {
    try {
        await connect(config.MONGO_URL);
        console.log(`Server started on port ${config.PORT}`)
    } catch (e) {
        console.log("ERROR while starting server", e.message);
        process.exit(1);
    }
})
