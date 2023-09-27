import * as express from "express"
import { AppDataSource } from "./data-source"
import cors from "cors"
import router from "./route"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 5000

        // const corsOptions = {
        // Wajib :
        //     origin: '*',
        //     methods: ["GET", "POST", "PATCH", "DELETE"],
        //     allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"]
        // }

        // OPTIONAL :
        // exposedHeaders, credentials, maxAge, preflightContinue, optionSuccessStatus


        // app.use(cors(corsOptions))
        app.use(cors())
        app.use(express.json())
        app.use("/api/v1", router)

        app.listen(port, () => `Server started on port ${port}`)
    })
    .catch(error => console.log(error))
