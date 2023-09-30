import { Router, Request, Response } from 'express'

import * as citiesController from '../controllers/cities'

const citiesRouter = Router()

citiesRouter.get(`/`, citiesController.getAll)
citiesRouter.get(`/:id`, citiesController.get)

citiesRouter.post(`/`, citiesController.create)         // create for multiple users

citiesRouter.put(`/:id`, citiesController.update)


citiesRouter.delete(`/:id`, citiesController.deleteById)


/**     Associations    **/




export default citiesRouter