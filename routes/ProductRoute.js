import express from "express";
import {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/Products.js';
import { verifyUser } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/products", verifyUser,getProduct);
router.get("/products/:id", verifyUser,getProductById);

router.post("/products",verifyUser, createProduct);

router.patch("/products/:id",verifyUser, updateProduct);

router.delete("/products/:id",verifyUser, deleteProduct);

export default router;