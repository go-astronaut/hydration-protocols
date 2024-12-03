import expres from "express";
import { hotel } from "../Controllers/Hotel/Hotel";

const hotelRoutes = expres.Router();

// Submit request for a room
hotelRoutes.post("/submit-req", hotel.submitReq);

hotelRoutes.get("/handshake", hotel.handshake);

hotelRoutes.get("/get-month-logs", hotel.getMonthLogs);

export default hotelRoutes;
