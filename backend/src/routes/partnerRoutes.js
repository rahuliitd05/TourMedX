import PartnerRequest from '../models/PartnerRequest.js';
import createResourceRouter from './resourceRouter.js';

export default createResourceRouter(PartnerRequest, {
  searchFields: ['name', 'organization', 'specialty', 'email'],
  allowPublicCreate: true,
  allowPublicRead: false
});
