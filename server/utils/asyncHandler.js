const asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        console.log(`error:${error.message}, stack:${error.stack}`);
        res.json({status: "error", message: error.message, stack: error.stack})
      }
    };
  };
  
  export default asyncHandler;