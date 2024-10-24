import { Request, Response } from "express"
import { addProduct, changeProduct, getAllProducts, getProduct, deleteProduct } from "../models/product"
import { Product } from "../utils/types"

export async function fetchAllProducts(req: Request, res: Response) {
    const result = await getAllProducts()
    res.json(result)
}

export async function newProduct(req: Request, res: Response) {
    const { name, image, price, category } = req.body
    if (name && image && price && category) {

        const product: Product = { name: name, image: image, price: price, category: category }
        const newProduct = await addProduct(product)
        if (newProduct) {
            res.json(newProduct)
        }
        else {
            console.log("something went wrong saving the record to the database")
            res.json({ err: "something went wrong saving the record to the database" })
        }
    }
    else {
        console.log("body does not contain appropriate values for type 'Product'")
        res.json({ err: "body does not contain appropriate values for type 'Product'" })
    }
}

export async function fetchProduct(req: Request, res: Response) {
    const product = await getProduct(parseInt(req.params.id))

    if (Object.keys(product).length !== 0) {
        res.json(product)
    }
    else {
        res.json({ err: `product with id ${req.params.id} does not exist` })
    }
}

export async function editProduct(req: Request, res: Response) {
    const { name, image, price, category } = req.body
    if (name && image && price && category) {
        const newValues = { name, image, price, category }
        if (await changeProduct(parseInt(req.params.id), newValues)) {
            res.status(200).end()
        }
        res.status(406).end()
    }
    else {
        res.status(406).end()
    }
}


export async function removeProduct(req: Request, res: Response) {
    if (await deleteProduct(parseInt(req.params.id))) {
        res.status(200).end()
    }
    res.status(400).end()
}
