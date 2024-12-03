import express from "express";
import { carSells } from "../Controllers/CarSells/CarSells";
import { upload } from "../Initializer";

const carsSellsRoutes = express.Router();

carsSellsRoutes.post("/submit-req", upload, carSells.submitReq);

carsSellsRoutes.get("/handshake", carSells.handshake);

carsSellsRoutes.get("/get-month-logs", carSells.getMonthLogs);

export default carsSellsRoutes;
