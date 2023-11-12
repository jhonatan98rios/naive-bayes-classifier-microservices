import * as dotenv from 'dotenv'
import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import { ClasssifierController } from "./controllers";
import Database from "./infra/drivers/Database";

const app = new Elysia()
const classsifierController = new ClasssifierController()

dotenv.config()
await Database.connect()

const corsMiddleware = cors({ origin: '*' })
app.use(corsMiddleware)

app.get("/list-classifiers", classsifierController.list)

app.get("/read-classifier/:id", classsifierController.readClassifier)

app.get("read-classifier/:id/status", classsifierController.readClassifierStatus)

app.post("/classify", classsifierController.classify)

app.listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
