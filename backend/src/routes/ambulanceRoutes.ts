import { Router } from "express";
import { AmbulanceController } from "../controllers/ambulanceController";
import { upload } from "../middleware/upload";

const router = Router();
const ambulanceController = new AmbulanceController();

router.get("/", ambulanceController.getAllAmbulances.bind(ambulanceController));
router.get(
  "/count",
  ambulanceController.getAmbulanceCount.bind(ambulanceController)
);
router.get(
  "/:id",
  ambulanceController.getAmbulanceById.bind(ambulanceController)
);
router.post(
  "/",
  upload.single("image"),
  ambulanceController.createAmbulance.bind(ambulanceController)
);
router.put(
  "/:id",
  upload.single("image"),
  ambulanceController.updateAmbulance.bind(ambulanceController)
);
router.delete(
  "/:id",
  ambulanceController.deleteAmbulance.bind(ambulanceController)
);

export default router;
