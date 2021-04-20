import * as express from "express";
import {
  getAllPlans,
  importPlans,
  getFilterPlan,
} from "../../controllers/v1/plan.controller";

const router = express.Router();

router.get("/plan/init", importPlans);
router.get("/plan", getAllPlans);
router.get("/plan/:salary", getFilterPlan);

export default router;
