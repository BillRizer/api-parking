import { Request } from 'express';
import { IJwtBody } from './jwt-response.interface';

interface RequestWithCompanty extends Request {
  user: IJwtBody;
}

export default RequestWithCompanty;
