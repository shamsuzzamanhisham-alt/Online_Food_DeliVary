import express from 'express';
import FoodController from '../controllers/FoodController.js';
import multer from 'multer';

class FoodRoute {
  constructor() {
    this.router = express.Router();
    this.controller = FoodController;
    this.upload = this.configureMulter();
    this.initializeRoutes();
  }

  configureMulter() {
    const storage = multer.diskStorage({
      destination: "uploads", 
      filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
      }
    });

    return multer({ storage: storage });
  }

  initializeRoutes() {
    this.router.post("/add", this.upload.single("image"), this.controller.addFood);
    this.router.get("/list", this.controller.listFood);
    this.router.post("/remove", this.controller.removeFood);
    this.router.put("/update/:id", this.upload.single("image"), this.controller.updateFood);
    this.router.get("/search", this.controller.searchFood);
  }

  getRouter() {
    return this.router;
  }
}

export default new FoodRoute().getRouter();
