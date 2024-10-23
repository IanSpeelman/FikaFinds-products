import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from "./routes/productRoutes"
import { sequelize } from './utils/database';
import cors from 'cors'

async function verifyDbConnection() {
    try {
        await sequelize.authenticate()
        console.log("database connection succes")
    }
    catch (err) {
        console.log("datbase connection could not be established", err)
    }
}
verifyDbConnection()

let corsOptions = {
    origin: "*"
}

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.use("/products", productRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
