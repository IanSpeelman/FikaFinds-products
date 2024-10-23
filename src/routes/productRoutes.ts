import { Router } from "express";
import { fetchAllProducts, fetchProduct, newProduct, editProduct, removeProduct } from "../controllers/productController";

const router = Router()


router.get("/", fetchAllProducts)
router.post("/add", newProduct)
router.get("/:id", fetchProduct)
router.post("/edit/:id", editProduct)
router.delete("/delete/:id", removeProduct)


export default router;
