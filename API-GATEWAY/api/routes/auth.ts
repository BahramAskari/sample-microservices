/**
 * We will refer each endpoint to controller
 * Threw errors from controllers|services will handle as responses in routes
 */
import { Router, Request, Response} from 'express'

import * as authController from '../controllers/auth'
import {CheckAuth} from "../middlewares/CheckAuth.middleware";

const authAdminRouter = Router()

authAdminRouter.post(`/register`, authController.register)
authAdminRouter.post(`/login`, authController.loginAdmin)

authAdminRouter.post(`/refreshToken/:token`, authController.refreshAccessToken)
// logout -> remove accessToken in frontend from localStorage & delete refreshToken from database
authAdminRouter.post(`/logout`, CheckAuth, authController.logout)






export default authAdminRouter