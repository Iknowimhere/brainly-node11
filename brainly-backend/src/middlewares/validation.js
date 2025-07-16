import z from 'zod'
export const validate = (schema) => {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: z.prettifyError(result.error) });
    }
    req.body = result.data;
    next();
  };
};
