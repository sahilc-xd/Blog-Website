import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  signUpInput,
  signInInput,
  createBlog,
  updateBlog,
} from "@sahilcodes23/medium-commons";

//https://excalidraw.com/#json=yAJ1UB43w9d9W5ip4ALiy,s_97t7Y_mAt_uXEMBjcBBA

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log("called");
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct",
    });
  }
  //zod validation
  //{
  //email:String
  //password:String
  //name:optional String
  //}
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(jwt);
  } catch (e) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json(jwt);
});
