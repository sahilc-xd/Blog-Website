import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

//type inference in zod
//frontend will need this

//signin Input
export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

//type inference in zod
//frontend will need this

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlog = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

//this below frontend will need this
export type SignupInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type UpdateBlog = z.infer<typeof updateBlog>;
export type CreateBlog = z.infer<typeof createBlog>;
