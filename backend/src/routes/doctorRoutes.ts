import { Router } from "express";
import { DoctorController } from "../controllers/doctorController";
import { upload } from "../middleware/upload";

const router = Router();
const doctorController = new DoctorController();

router.get("/", doctorController.getAllDoctors.bind(doctorController));
router.get("/count", doctorController.getDoctorCount.bind(doctorController));
router.get("/:id", doctorController.getDoctorById.bind(doctorController));
router.post(
  "/",
  upload.single("image"),
  doctorController.createDoctor.bind(doctorController)
);
router.put(
  "/:id",
  upload.single("image"),
  doctorController.updateDoctor.bind(doctorController)
);
router.delete("/:id", doctorController.deleteDoctor.bind(doctorController));

export default router;
