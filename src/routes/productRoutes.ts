import { Router } from "express";
import { fetchAllProducts, newProduct } from "../controllers/productController";

const router = Router()


router.get("/", fetchAllProducts)
router.get("/add", newProduct)


export default router;
