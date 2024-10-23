import { DataTypes } from "sequelize"
import { sequelize } from "../utils/database"
import { Product } from "../utils/types";

const Product = sequelize.define("product", {
    name: { type: DataTypes.STRING, allowNull: false, },
    image: { type: DataTypes.STRING, allowNull: false, },
    price: { type: DataTypes.INTEGER, allowNull: false, },
    category: { type: DataTypes.STRING, allowNull: false, },
    stock: { type: DataTypes.INTEGER, allowNull: true, },
    amount: { type: DataTypes.INTEGER, allowNull: true, }
});
(async () => {
    await sequelize.sync({ alter: true });
})();

export async function getAllProducts(): Promise<Product[] | []> {
    const result = await Product.findAll();
    return result
}

export function addProduct(product: Product): Product | boolean {
    const newProduct = Product.build(product)
    try {
        newProduct.save()
        return newProduct
    }
    catch (err) {
        console.log("Could not save product to database", err)
        return false
    }
}

export async function getProduct(id: number): Promise<Product> {
    const product = await Product.findAll({
        where: {
            id: id
        }
    })
    return product
}

export async function changeProduct(id: number, product: Product): Promise<boolean> {
    try {
        const { name, image, price, category } = product
        await Product.update({
            name,
            image,
            price,
            category
        },
            {
                where: {
                    id: id
                }
            })
        return true
    }
    catch (err) {
        console.log("Oops somethign went wrong", err)
        return false
    }
}

export async function deleteProduct(id: number): Promise<boolean> {
    try {
        await Product.destroy({ where: { id: id } })
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}






















