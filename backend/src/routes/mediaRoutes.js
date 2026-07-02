import Media from '../models/Media.js';
import createResourceRouter from './resourceRouter.js';
import { upload } from '../middleware/upload.js';

export default createResourceRouter(Media, {
  searchFields: ['title', 'altText'],
  singleFileField: 'fileUrl',
  allowPublicRead: false,
  uploadMiddleware: upload.single('file')
});
