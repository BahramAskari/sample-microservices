import { Router, Request, Response } from 'express'

import * as usersController from '../controllers/users'
import * as user_rolesController from '../controllers/users/associations/roles'

const usersRouter = Router()

//  ------------------------------- List & Get -------------------------------
usersRouter.get(`/`,  usersController.getAll)
usersRouter.get(`/:id`,  usersController.get)
//  ------------------------------- Check -------------------------------
usersRouter.get(`/check/username/:username`, usersController.usernameAvailable)
usersRouter.get(`/:userId/check/username/:username`, usersController.usernameAvailableForUser)
usersRouter.get(`/check/email/:email`, usersController.emailAvailable)
usersRouter.get(`/:userId/check/email/:email`, usersController.emailAvailableForUser)
//  ------------------------------- Upload -------------------------------
usersRouter.post(`/`, usersController.create)
//  ------------------------------- Update -------------------------------
usersRouter.put(`/:id`, usersController.update)
//  ------------------------------- Delete -------------------------------
usersRouter.delete(`/:id`, usersController.deleteById)


/**     Associations    **/
/*  roles */
usersRouter.get(`/:userId/roles`,  user_rolesController.listRoles)
usersRouter.post(`/:userId/role/:roleId`, user_rolesController.addRole)
usersRouter.delete(`/:userId/role/:roleId`, user_rolesController.removeRole)


export default usersRouter