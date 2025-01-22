import express from "express"
import { createPolicy, deletePolicy, editPolicy, getAllPolicies, getPolicyById } from "../controllers/policy.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const policyRouter = express.Router()

policyRouter.post("/create-policy",isAuthenticated,createPolicy);

policyRouter.put("/edit-policy/:id",isAuthenticated,isAdmin,editPolicy);

policyRouter.get("/single-policy/:id",isAuthenticated,isAdmin,getPolicyById)

policyRouter.delete("/delete-policy/:id",isAuthenticated,isAdmin,deletePolicy);

policyRouter.get("/all-policy",getAllPolicies)

export default policyRouter
