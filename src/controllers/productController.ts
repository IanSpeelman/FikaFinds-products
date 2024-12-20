import { Request, Response } from "express"
import { addProduct, changeProduct, getAllProducts, getProduct, deleteProduct } from "../models/product"
import { jwtToken, Product } from "../utils/types"
import { Product as Database } from "../utils/database"
import { isCorrectSpecificationFormat, isCorrectImageString } from "../utils/checkSpecificationType"
import { jwtDecode } from "jwt-decode"

export async function fetchAllProducts(req: Request, res: Response) {
    try {
        const products = await getAllProducts(Database)
        if (products.length === 0) {
            res.status(404).json({ err: "no products found" })
        }
        else {
            res.status(200).json(products)
        }
    }
    catch (err) {
        res.status(500).json({ err: `no products could be found` })
    }
}


export async function newProduct(req: Request, res: Response) {
    try {
        const token = req.get('Authorization') || ""
        const decoded: jwtToken = jwtDecode(token)
        if (decoded.admin !== true || !(decoded.exp > Math.floor(Date.now() / 1000))) {
            res.status(403).json({ err: "you do not have administrative privileges" })
        }
    }
    catch (err) {
        res.status(403).json({ err: "you do not have administrative privileges" })
        return
    }

    const { name, image, price, category, description, specifications } = req.body
    if (name && isCorrectImageString(image) && price && category && description && isCorrectSpecificationFormat(specifications)) {

        const product: Product = { name, image, price, category, specifications, description }
        const newProduct = await addProduct(Database, product)
        if (newProduct) {
            res.status(201).json(newProduct)
        }
        else {
            res.status(500).json({ err: "something went wrong saving the record to the database" })
        }
    }
    else {
        res.status(406).json({ err: "body does not contain appropriate values for type 'Product'" })
    }
}

export async function fetchProduct(req: Request, res: Response) {
    const product = await getProduct(Database, parseInt(req.params.id))
    if (Object.keys(product).length !== 0) {
        res.status(200).json(product)
    }
    else {
        res.status(404).json({ err: `product with id ${req.params.id} does not exist` })
    }
}

export async function editProduct(req: Request, res: Response) {
    try {
        const token = req.get('Authorization') || ""
        const decoded: jwtToken = jwtDecode(token)
        if (decoded.admin !== true || !(decoded.exp > Math.floor(Date.now() / 1000))) {
            res.status(403).json({ err: "you do not have administrative privileges" })
        }
    }
    catch (err) {
        res.status(403).json({ err: "you do not have administrative privileges" })
        return
    }
    const { name, image, price, category, description, specifications } = req.body
    if (name && isCorrectImageString(image) && price && category && description && isCorrectSpecificationFormat(specifications)) {

        const newValues = { name, image, price, category, specifications, description }
        const editedProduct = await changeProduct(Database, parseInt(req.params.id), newValues)
        if (editedProduct) {
            res.status(200).json(editedProduct)
        }
        res.status(406).end()
    }
    else {
        res.status(406).end()
    }
}

export async function removeProduct(req: Request, res: Response) {
    try {
        const token = req.get('Authorization') || ""
        const decoded: jwtToken = jwtDecode(token)
        if (decoded.admin !== true || !(decoded.exp > Math.floor(Date.now() / 1000))) {
            res.status(403).json({ err: "you do not have administrative privileges" })
        }
    }
    catch (err) {
        res.status(403).json({ err: "you do not have administrative privileges" })
        return
    }

    if (await deleteProduct(Database, parseInt(req.params.id))) {
        res.status(204).end()
    }
    res.status(404).end()
}
