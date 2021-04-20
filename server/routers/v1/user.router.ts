import * as express from "express";
import { saveUser } from "../../controllers/v1/user.controller";

const router = express.Router();

router.post("/user", saveUser);

export default router;
