import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { User } from "./entity/index"
import express from "express"
import {userRouter} from "../src/routes/user.routes"
import { authRouter } from "./routes/auth.routes"
import { protectedRouter } from "./routes/protected.routes"
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", protectedRouter)

AppDataSource.initialize().then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.email = "mehran@gmail.com"
    user.password = "random"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
