import { Router } from "express";
import { fetchAllProducts, fetchProduct, newProduct, editProduct, removeProduct } from "../controllers/productController";

const router = Router()


router.get("/", fetchAllProducts)
router.post("/", newProduct)
router.get("/:id", fetchProduct)
router.patch("/edit/:id", editProduct)
router.delete("/:id", removeProduct)


export default router;
