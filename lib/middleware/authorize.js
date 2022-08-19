module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('you do not have access to view this this page');
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
