import Treatment from '../models/Treatment.js';
import createResourceRouter from './resourceRouter.js';

export default createResourceRouter(Treatment, {
  searchFields: ['title', 'slug', 'overview'],
  arrayFields: ['benefits'],
  faqField: 'faqs',
  faqTargetField: 'faqs',
  upsertField: 'slug'
});

