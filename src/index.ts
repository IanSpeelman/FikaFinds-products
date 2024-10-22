import express from 'express';
import productRoutes from "./routes/productRoutes"
import { sequelize } from './utils/database';
const cors = require("cors")

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
const PORT = process.env.PORT || 3000;

app.use("/products", productRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

