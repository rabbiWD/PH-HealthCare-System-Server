import {  Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { AppoinmentController } from "./appoinment.controller";


const router = Router();

router.post("/book-appoinment", AppoinmentController.bookAppoinment);

// book appoinment callack url
router.get("/book-appoinment/payment/callback", ()=>{});

export const AppoinmentRoutes = router;
