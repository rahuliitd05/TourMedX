import Contact from '../models/Contact.js';
import createResourceRouter from './resourceRouter.js';

export default createResourceRouter(Contact, {
  searchFields: ['name', 'email', 'country', 'treatment'],
  allowPublicCreate: true,
  allowPublicRead: false
});
