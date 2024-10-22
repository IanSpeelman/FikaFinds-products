import { DataTypes, Model } from "sequelize"
import { sequelize } from "../utils/database"

export type Product = {
    id: number,
    name: string,
    image: string,
    price: number
    category: string
    stock?: number
    amount?: number
}

const Product = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});
(async () => {
    await sequelize.sync({ alter: true });
})();




export async function getAllProducts(): Promise<[]> {
    const result = await Product.findAll();
    return result
}

export function addProduct(): boolean {
    const test = Product.build({ name: "test", image: "test", price: 99, category: "test" })
    test.save()
    return false
}
