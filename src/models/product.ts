import { Product } from "../utils/types";
import { Product as ProductModel } from "../utils/database";
import { get } from "http";

export async function getAllProducts(Database: typeof ProductModel): Promise<Product[] | []> {
    const result = await Database.findAll();
    return result
}


export async function addProduct(Database: typeof ProductModel, product: Product): Promise<Product | boolean> {
    try {
        const newProduct = await Database.build(product)
        await newProduct.save()
        return newProduct
    }
    catch (err) {
        return false
    }
}

export async function getProduct(Database: typeof ProductModel, id: number): Promise<Product> {
    const product = await Database.findAll({
        where: {
            id: id
        }
    })
    return product
}

export async function changeProduct(Database: typeof ProductModel, id: number, product: Product): Promise<Product | boolean> {
    try {
        const { name, image, price, category } = product
        const editedProduct = await Database.update({
            name,
            image,
            price,
            category
        },
            {
                where: { id: id }
            })
        const newValues = await Database.findAll({ where: { id: id } })

        return newValues
    }
    catch (err) {
        console.log("Oops somethign went wrong", err)
        return false
    }
}

export async function deleteProduct(Database: typeof ProductModel, id: number): Promise<boolean> {
    try {
        const deleteResult = await Database.destroy({ where: { id: id } })
        if (deleteResult) {
            return true
        }
    }
    catch (err) {
        console.log(err)
        return false
    }
    return false
}
