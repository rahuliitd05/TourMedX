import Package from '../models/Package.js';
import createResourceRouter from './resourceRouter.js';
import { upload } from '../middleware/upload.js';

export default createResourceRouter(Package, {
  searchFields: ['packageName', 'duration', 'price'],
  arrayFields: ['itinerary', 'includedServices'],
  multiFileFields: ['gallery'],
  uploadMiddleware: upload.fields([{ name: 'gallery', maxCount: 12 }])
});
