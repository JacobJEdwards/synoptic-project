export default function asyncHandler(fn) {
  return async (req, res, next, ...args) => {
    try {
      await fn(req, res, next, ...args);
    } catch (err) {
      next(err);
    }
  };
}
