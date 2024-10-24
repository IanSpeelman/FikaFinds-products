import { Product } from "../utils/types";
import { Product as ProductModel } from "../utils/database";







export async function getAllProducts(Database: typeof ProductModel): Promise<Product[] | []> {
    const result = await Database.findAll();
    return result
}


export function addProduct(Database: typeof ProductModel, product: Product): Product | boolean {
    const newProduct = Database.build(product)
    try {
        newProduct.save()
        return newProduct
    }
    catch (err) {
        console.log("Could not save product to database", err)
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

export async function changeProduct(Database: typeof ProductModel, id: number, product: Product): Promise<boolean> {
    try {
        const { name, image, price, category } = product
        await Database.update({
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

export async function deleteProduct(Database: typeof ProductModel, id: number): Promise<boolean> {
    try {
        await Database.destroy({ where: { id: id } })
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}






















