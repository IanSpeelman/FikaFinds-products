import { Request, Response } from "express"
import { addProduct, getAllProducts } from "../models/product"

export async function fetchAllProducts(req: Request, res: Response) {
    const result = await getAllProducts()
    res.json(result)
}

export function newProduct(req: Request, res: Response) {
    addProduct()
    res.json({ hi: "hi" })
}
