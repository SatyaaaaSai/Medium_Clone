import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { updateBlogInput,createBlogInput} from "@satya07thota/common-medium-satya";
export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  },
  Variables:{
    userId: string;
  }
}>();

postRouter.use("/*", async (c,next)=>{
    const authHeader=c.req.header("Authorization") || " ";
    const user=await verify(authHeader,"secret");
    if(user){
        //@ts-ignore
       c.set("userId",user.id);
        await next();
    } else {
        c.status(400);
        return c.json({
            "message":"You are not Logged in!"
        })
    }


})

postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success}=createBlogInput.safeParse(body);
  if(!success){
    c.status(404);
    return c.json({ error: "Invalid Inputs" });
  }
  const authorId=c.get("userId");
  console.log(authorId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post=await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({
    id:post.id
  });
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success}=updateBlogInput.safeParse(body);
  if(!success){
    c.status(404);
    return c.json({ error: "Invalid Inputs" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      id: body.id,
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

postRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blogs = await prisma.post.findMany(
      {
        select:{
          title:true,
          content:true,
          id:true,
          author: {
            select:{
              name:true,
              email:true,
            }
          }
        }
      }
    );
  
    return c.json({
      blogs,
    });
  });

postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  console.log(id);  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id:id,
      },
      select:{
        title:true,
        content:true,
        id:true,
        author: {
          select:{
            email:true,
          }
        }
      }
    });
    return c.json({
      blog,
    });
  } catch (err) {
    return c.json({
      message: "Blog not found",
    });
  }
});

//TODO: Add Pagination

