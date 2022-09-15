import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import {
  useExpressServer
} from 'routing-controllers';
import {UserController} from "./controllers/user.controller";

const PORT = 8080;

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());

  useExpressServer(app, {
    controllers: [
      UserController
    ]
  });

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
}

bootstrap();