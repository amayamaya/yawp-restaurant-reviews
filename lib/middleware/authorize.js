module.exports = async (req, res, next) => {
  try {
    // console.log('hello req user', req.user);
    // console.log(
    //   'hello contains admin',
    //   req.user && req.user.email.includes('admin')
    // );
    if (!req.user || !req.user.email.includes('admin'))
      throw new Error('you do not have access to view this this page');
    next();
  } catch (error) {
    error.status = 403;
    // console.log(error);
    next(error);
  }
};
