import z from "zod";

export const validate = (schema) => {
  return function (req, res, next) {
    let result = z.safeParse(schema);
    console.log(result);
    req.body = result.data;
    next();
  };
};
