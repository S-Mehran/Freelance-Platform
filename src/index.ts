import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { User } from "./entity/index"
import express from "express"
import {userRouter} from "../src/routes/user.routes"
import { authRouter } from "./routes/auth.routes"
import { protectedRouter } from "./routes/protected.routes"
import postRouter from "./routes/job-post.route"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express();
//app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // important for preflight
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", protectedRouter)
app.use("/api", postRouter)

AppDataSource.initialize().then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
