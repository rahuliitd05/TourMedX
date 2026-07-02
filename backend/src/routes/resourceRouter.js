import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { protect } from '../middleware/auth.js';
import createResourceController from '../controllers/resourceController.js';

export default function createResourceRouter(Model, options = {}) {
  const router = Router();
  const controller = createResourceController(Model, options);
  const allowPublicCreate = options.allowPublicCreate || false;
  const allowPublicUpdate = options.allowPublicUpdate || false;
  const allowPublicDelete = options.allowPublicDelete || false;
  const allowPublicRead = options.allowPublicRead !== false;

  if (allowPublicRead) {
    router.get('/', asyncHandler(controller.list));
    router.get('/:id', asyncHandler(controller.getOne));
  } else {
    router.get('/', protect, asyncHandler(controller.list));
    router.get('/:id', protect, asyncHandler(controller.getOne));
  }

  if (allowPublicCreate) {
    router.post(
      '/',
      options.uploadMiddleware || ((request, response, next) => next()),
      asyncHandler(controller.createOne)
    );
  } else {
    router.post(
      '/',
      protect,
      options.uploadMiddleware || ((request, response, next) => next()),
      asyncHandler(controller.createOne)
    );
  }

  if (allowPublicUpdate) {
    router.put(
      '/:id',
      options.uploadMiddleware || ((request, response, next) => next()),
      asyncHandler(controller.updateOne)
    );
  } else {
    router.put(
      '/:id',
      protect,
      options.uploadMiddleware || ((request, response, next) => next()),
      asyncHandler(controller.updateOne)
    );
  }

  if (allowPublicDelete) {
    router.delete('/:id', asyncHandler(controller.deleteOne));
  } else {
    router.delete('/:id', protect, asyncHandler(controller.deleteOne));
  }

  return router;
}
