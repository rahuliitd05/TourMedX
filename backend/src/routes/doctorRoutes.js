import Doctor from '../models/Doctor.js';
import createResourceRouter from './resourceRouter.js';
import { upload } from '../middleware/upload.js';

export default createResourceRouter(Doctor, {
  searchFields: ['name', 'specialty', 'biography'],
  arrayFields: ['procedures', 'hospitals', 'languages'],
  singleFileField: 'photo',
  uploadMiddleware: upload.single('photo')
});
