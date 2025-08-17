import express from 'express'
import { dbConnection } from './database/dbconnection.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './src/modules/user/user.router.js'

const app = express()
const port = 5000

dotenv.config()
app.use(cors())
app.use(express.json())


app.use('/api/v1', userRouter)


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// server.js

// import express from "express";

// import fetch from "node-fetch";

// import bodyParser from "body-parser";

// const app = express();

// app.use(bodyParser.json());
// app.post("/api/getSession", async (req, res) => {

//     const username = "merchant.TESTQNBAATEST001";

//     // const password = "9c6a123857f1ea50830efa023ad8c8d1b";
//     const password = "9c6a123857f1ea50830fa023ad8c8d1b";

//     const token = Buffer.from(`${username}:${password}`).toString("base64");

//     try {

//         const mpgsRes = await fetch("https://qnbalahli.test.gateway.mastercard.com/api/rest/version/72/merchant/TESTQNBAATEST001/session", {
//             method: "POST",

//             headers: {

//                 "Content-Type": "application/json",

//                 "Authorization": `Basic ${token}`

//             },

//             body: JSON.stringify(req.body)

//         });

//         const data = await mpgsRes.text();

//         res.status(mpgsRes.status).send(data);

//     } catch (err) {

//         res.status(500).send(err.toString());

//     }

// });

// app.listen(3001, () => console.log("Server running on http://localhost:3001"));
