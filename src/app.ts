import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from "./routes/productRoutes"
import cors from 'cors'

let corsOptions = {
    origin: "*"
}

export const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use("/products", productRoutes)
