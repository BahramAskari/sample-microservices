import { Router, Request, Response } from 'express'

import * as tagsController from '../controllers/tags'

const tagsRouter = Router()

tagsRouter.get(`/`, tagsController.getAll)
tagsRouter.get(`/:id`, tagsController.getById)

tagsRouter.post(`/`, tagsController.create)

tagsRouter.put(`/:id`, tagsController.update)

tagsRouter.delete(`/:id`, tagsController.deleteById)

/**     Associations    **/






export default tagsRouter