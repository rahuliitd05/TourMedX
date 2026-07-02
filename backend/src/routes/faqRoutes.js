import FAQ from '../models/FAQ.js';
import createResourceRouter from './resourceRouter.js';

export default createResourceRouter(FAQ, {
  searchFields: ['question', 'answer', 'category']
});
