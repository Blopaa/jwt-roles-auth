import { Router } from "express";

const router = Router();

import * as productCtrl from "../controllers/products.controller";
import { verifyToken } from "../middlewares";

router.get("/", productCtrl.getProducts);
router.post("/", verifyToken, productCtrl.createProduct);
router.get("/:productId", verifyToken, productCtrl.getProductById);
router.put("/:productId", verifyToken, productCtrl.updateProductById);
router.delete("/:productId", verifyToken, productCtrl.deleteProductById);

export default router;
