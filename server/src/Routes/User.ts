import express from "express";
import { userController } from "../Controllers/User/User";

const userRoutes = express.Router();

userRoutes.post("/sign-up", userController.signUp);

userRoutes.get("/get-translations/:language", userController.getTranslations);

export default userRoutes;
