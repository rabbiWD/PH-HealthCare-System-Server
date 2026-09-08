import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import {  UserValidation } from "./auth.validation";

import z from "zod";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();


router.patch("/profile-image",
    validateRequest(UserValidation.ResetPasswordZodSchema),
     AuthController.resetPassword);

export const UserRoutes = router;
