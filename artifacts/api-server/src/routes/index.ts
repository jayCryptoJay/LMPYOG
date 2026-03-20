import { Router, type IRouter } from "express";
import healthRouter from "./health";
import researchRouter from "./research";
import scriptsRouter from "./scripts";
import clipsRouter from "./clips";
import episodesRouter from "./episodes";
import trendsRouter from "./trends";

const router: IRouter = Router();

router.use(healthRouter);
router.use(researchRouter);
router.use(scriptsRouter);
router.use(clipsRouter);
router.use(episodesRouter);
router.use(trendsRouter);

export default router;
