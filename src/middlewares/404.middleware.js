import { Status, Reason } from '../constants';

export default (req, res, next) => {
  res.status(Status.NOT_FOUND).json({
    status: Status.NOT_FOUND,
    reason: Reason.NOT_FOUND,
    message: 'Page Not Found',
  });
};
