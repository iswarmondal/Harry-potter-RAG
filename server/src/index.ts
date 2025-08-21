import dotenv from "dotenv";
dotenv.config({ override: true });
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("OK"));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

export default app;
