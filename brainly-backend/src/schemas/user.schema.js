import z from "zod";

let singupSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data)=>{
  return data.password===data.confirmPassword
},{message:"password and confirm password doesnt match"});

export default singupSchema;