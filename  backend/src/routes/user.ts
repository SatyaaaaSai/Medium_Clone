import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput,signinInput } from "@satya07thota/common-medium-satya";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const {success}=signupInput.safeParse(body);
  console.log(success);
  if(!success){
    c.status(404);
    return c.json({ error: "Invalid Inputs" });
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const jwt = await sign({ id: user.id }, "secret");
  return c.text(jwt);
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success}=signinInput.safeParse(body);
  if(!success){
    c.status(404);
    return c.json({ error: "Invalid Inputs" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User does not found" });
  }

  const jwt = await sign({ id: user.id }, "secret");
  return c.json({ jwt });
});
