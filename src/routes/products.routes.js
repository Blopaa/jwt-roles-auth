import { Router } from "express";

const router = Router();

import * as productCtrl from "../controllers/products.controller";
import { JwtAuth } from "../middlewares";

router.get("/", productCtrl.getProducts);
router.post("/", [JwtAuth.verifyToken, JwtAuth.isModerator], productCtrl.createProduct);
router.get("/:productId", [JwtAuth.verifyToken], productCtrl.getProductById);
router.put("/:productId", [JwtAuth.verifyToken], productCtrl.updateProductById);
router.delete("/:productId", [JwtAuth.verifyToken, JwtAuth.isModerator], productCtrl.deleteProductById);

export default router;
