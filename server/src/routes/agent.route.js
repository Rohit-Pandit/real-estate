import {
    createAgent,
    getAllAgents,
    deleteAgent,
    updateAgent
} from "../controllers/agent.controller.js";
import express from "express";

const router = express.Router();

router.post("/create-agent", createAgent);
router.get("/get-all-agents", getAllAgents);
router.delete("/delete-agent/:id", deleteAgent);
router.put("/update-agent/:id", updateAgent);

export default router;