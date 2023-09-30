import { Router, Request, Response } from 'express'

import * as rolesController from '../controllers/roles'
import * as role_usersController from '../controllers/roles/associations/users'

const rolesRouter = Router()

rolesRouter.get(`/`,  rolesController.getAll)
rolesRouter.get(`/:id`,  rolesController.get)

rolesRouter.post(`/`, rolesController.create)

rolesRouter.put(`/:id`, rolesController.update)

rolesRouter.delete(`/:id`, rolesController.deleteById)

/**     Associations    **/

/*  Role -> User  */
rolesRouter.get(`/:roleId/users`,  role_usersController.listUsers)
rolesRouter.post(`/:roleId/user/:userId`, role_usersController.addUser)
rolesRouter.delete(`/:roleId/user/:userId`, role_usersController.removeUser)



export default rolesRouter