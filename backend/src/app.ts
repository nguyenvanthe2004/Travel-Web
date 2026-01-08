import "reflect-metadata";
import express from "express";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controllers/UserController";
import { connectMongoDB } from "./config/db";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ErrorHandler } from "./middlewares/errorHandler";
import { mongooseSerializer } from "./interceptors/serialize.interceptor";
import { LocationController } from "./controllers/LocationController";
import {
  AuthenticateMiddleware,
  UserPayload,
} from "./middlewares/authenticate";

dotenv.config();

useContainer(Container);

export const startServer = async () => {
  try {
    const app = express();

    app.use(cookieParser());

    // Connect DB
    await connectMongoDB();

    app.use(mongooseSerializer);

    useExpressServer(app, {
      controllers: [UserController, LocationController],
      middlewares: [ErrorHandler, AuthenticateMiddleware],
      authorizationChecker: (action: Action, roles: string[]) => {
        const user = (action.request as any).user;
        if (!user) return false; 

        if (roles.length === 0) return true; 

        console.log("User: ", user.role, "Roles: ", roles);

        return roles.includes(user.role);
      },
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
      validation: {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
      routePrefix: "/api",
      defaultErrorHandler: false,
    });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
