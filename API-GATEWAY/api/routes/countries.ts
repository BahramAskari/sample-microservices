import { Router, Request, Response } from 'express'

import * as countriesController from '../controllers/countries'
import * as country_provincesController from "../controllers/countries/associations/provinces";

const countriesRouter = Router()

countriesRouter.get(`/`, countriesController.getAll)
countriesRouter.get(`/:id`, countriesController.get)

countriesRouter.get(`/check/slug/:slug`, countriesController.slugAvailable)

countriesRouter.post(`/`, countriesController.create)

countriesRouter.put(`/:id`, countriesController.update)

countriesRouter.delete(`/:id`, countriesController.deleteById)

/**     Associations    **/
/* provinces */
countriesRouter.get(`/:countryId/provinces`, country_provincesController.listProvinces)
countriesRouter.post(`/:countryId/province/:provinceId`, country_provincesController.addProvince)
countriesRouter.delete(`/:countryId/province/:provinceId`, country_provincesController.removeProvince)



export default countriesRouter