import {  Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { AppoinmentController } from "./appoinment.controller";


const router = Router();

router.post("/book-appoinment", AppoinmentController.bookAppoinment);

export const AppoinmentRoutes = router;
