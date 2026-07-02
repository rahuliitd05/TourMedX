import Hospital from '../models/Hospital.js';
import createResourceRouter from './resourceRouter.js';
import { upload } from '../middleware/upload.js';

export default createResourceRouter(Hospital, {
  searchFields: ['name', 'about', 'location'],
  arrayFields: ['departments', 'services', 'facilities'],
  singleFileField: 'logo',
  multiFileFields: ['images'],
  uploadMiddleware: upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 12 }
  ])
});
