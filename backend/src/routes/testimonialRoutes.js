import Testimonial from '../models/Testimonial.js';
import createResourceRouter from './resourceRouter.js';

export default createResourceRouter(Testimonial, {
  searchFields: ['name', 'location', 'quote']
});
