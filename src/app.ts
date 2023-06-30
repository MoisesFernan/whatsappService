import "dotenv/config"
import express from "express"
import cors from "cors"
import routes from "./infrastructure/router"
import path from "path"
import {router} from "./infrastructure/router/lead.route";
const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//public folder
app.use("/public",express.static(path.join(__dirname, 'public')));

app.use(`/`,routes)

app.listen(port, () => console.log(`Ready...${port}`))