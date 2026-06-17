import express from "express";
import {
  saveContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", saveContact);
router.get("/contact", getContacts);
router.delete("/contact/:id", deleteContact);

export default router;