import { Router, Request, Response } from 'express'

import authRouter from './auth'
import tagsRouter from './tags'
import usersRouter from "./users";
import rolesRouter from "./roles";
import countriesRouter from "./countries";
import provincesRouter from "./provinces";
import citiesRouter from "./cities";
import {CheckAuth} from "../middlewares/CheckAuth.middleware"

export type REQUEST = Request & {
    UserId: number;
    accessToken: string;
    refreshToken: string
}

const router = Router()

// auth router for register & login to access the token for private routes
router.use(`/auth`, authRouter)

/* Begin Categorization routes */
router.use(`/tags`, CheckAuth, tagsRouter)
/* End Categorization routes */


/* Begin Location routes */
router.use(`/countries`, CheckAuth, countriesRouter)
router.use(`/provinces`, CheckAuth, provincesRouter)
router.use(`/cities`, CheckAuth, citiesRouter)
/* End Location routes */

/* Begin User-Management routes */
router.use(`/users`, CheckAuth, usersRouter)
router.use(`/roles`, CheckAuth, rolesRouter)
/* End User-Management routes */


export default router