import { Router, Request, Response } from 'express'

import * as provincesController from '../controllers/provinces'
import * as province_citiesController from '../controllers/provinces/associations/cities'

const provincesRouter = Router()

provincesRouter.get(`/`, provincesController.getAll)
provincesRouter.get(`/:id`, provincesController.get)

provincesRouter.get(`/check/slug/:slug`, provincesController.slugAvailable)

provincesRouter.post(`/`, provincesController.create)

provincesRouter.put(`/:id`, provincesController.update)


provincesRouter.delete(`/:id`, provincesController.deleteById)


/**     Associations    **/
/* cities */
provincesRouter.get(`/:provinceId/cities`, province_citiesController.listCities)
provincesRouter.post(`/:provinceId/city/:cityId`, province_citiesController.addCity)
provincesRouter.delete(`/:provinceId/city/:cityId`, province_citiesController.removeCity)



export default provincesRouter